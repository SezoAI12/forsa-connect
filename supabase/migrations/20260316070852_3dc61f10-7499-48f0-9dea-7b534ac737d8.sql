
-- Create categories enum
CREATE TYPE public.opportunity_category AS ENUM (
  'ai_services',
  'freelance_services', 
  'automation_services',
  'digital_arbitrage',
  'micro_saas'
);

-- Create competition level enum
CREATE TYPE public.competition_level AS ENUM ('low', 'medium', 'high');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  subscription_active BOOLEAN DEFAULT false,
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Opportunities table
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT,
  slug TEXT UNIQUE NOT NULL,
  category opportunity_category NOT NULL,
  overview TEXT NOT NULL,
  overview_ar TEXT,
  target_clients TEXT NOT NULL,
  target_clients_ar TEXT,
  demand_score INTEGER NOT NULL CHECK (demand_score >= 0 AND demand_score <= 100),
  competition competition_level NOT NULL DEFAULT 'medium',
  startup_cost NUMERIC DEFAULT 0,
  time_to_first_client TEXT NOT NULL,
  time_to_first_client_ar TEXT,
  income_potential_min NUMERIC NOT NULL,
  income_potential_max NUMERIC NOT NULL,
  income_currency TEXT DEFAULT 'USD',
  market_evidence TEXT,
  market_evidence_ar TEXT,
  service_blueprint JSONB NOT NULL DEFAULT '{}',
  service_blueprint_ar JSONB DEFAULT '{}',
  tools_stack JSONB NOT NULL DEFAULT '[]',
  client_acquisition TEXT,
  client_acquisition_ar TEXT,
  pricing_strategy JSONB NOT NULL DEFAULT '[]',
  price NUMERIC NOT NULL DEFAULT 29,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Anyone can browse published opportunities (public landing page)
CREATE POLICY "Anyone can view published opportunities" ON public.opportunities
  FOR SELECT USING (is_published = true);

-- Purchases table
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_provider TEXT NOT NULL,
  payment_id TEXT,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases" ON public.purchases
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Saved opportunities
CREATE TABLE public.saved_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE NOT NULL,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, opportunity_id)
);

ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved" ON public.saved_opportunities
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved" ON public.saved_opportunities
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved" ON public.saved_opportunities
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Weekly signals table
CREATE TABLE public.weekly_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT NOT NULL,
  description_ar TEXT,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_published BOOLEAN DEFAULT true
);

ALTER TABLE public.weekly_signals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published signals" ON public.weekly_signals
  FOR SELECT USING (is_published = true);
