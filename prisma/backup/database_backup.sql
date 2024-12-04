--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: neondb_owner
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO neondb_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: neondb_owner
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AuthProvider; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."AuthProvider" AS ENUM (
    'local',
    'google',
    'facebook'
);


ALTER TYPE public."AuthProvider" OWNER TO neondb_owner;

--
-- Name: ContentStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."ContentStatus" AS ENUM (
    'draft',
    'published',
    'private',
    'deleted'
);


ALTER TYPE public."ContentStatus" OWNER TO neondb_owner;

--
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."PaymentType" AS ENUM (
    'STRIPE',
    'MOMO',
    'ZALOPAY'
);


ALTER TYPE public."PaymentType" OWNER TO neondb_owner;

--
-- Name: SubscriptionType; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."SubscriptionType" AS ENUM (
    'FREE',
    'BASIC',
    'PREMIUM'
);


ALTER TYPE public."SubscriptionType" OWNER TO neondb_owner;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."UserRole" AS ENUM (
    'user',
    'admin',
    'teacher'
);


ALTER TYPE public."UserRole" OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Name: correction_credits; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.correction_credits (
    id text NOT NULL,
    user_id text NOT NULL,
    amount integer NOT NULL,
    price numeric(65,30) NOT NULL,
    payment_id text,
    payment_type public."PaymentType" NOT NULL,
    expire_date timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.correction_credits OWNER TO neondb_owner;

--
-- Name: correction_replies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.correction_replies (
    id text NOT NULL,
    correction_id text NOT NULL,
    comment text NOT NULL,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.correction_replies OWNER TO neondb_owner;

--
-- Name: correction_sentences; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.correction_sentences (
    id text NOT NULL,
    original_text text NOT NULL,
    corrected_text text,
    explanation text,
    is_correct boolean DEFAULT false NOT NULL,
    rating double precision,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    correction_id text NOT NULL,
    index integer NOT NULL
);


ALTER TABLE public.correction_sentences OWNER TO neondb_owner;

--
-- Name: corrections; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.corrections (
    id text NOT NULL,
    essay_id text NOT NULL,
    overall_comment text,
    rating double precision,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.corrections OWNER TO neondb_owner;

--
-- Name: course_progress; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.course_progress (
    id text NOT NULL,
    user_id text NOT NULL,
    course_id text NOT NULL,
    current_unit_id text,
    last_accessed_at timestamp(3) without time zone,
    completed_units text[] DEFAULT ARRAY[]::text[],
    next_unit_id text,
    completed_lessons text[] DEFAULT ARRAY[]::text[],
    current_lesson_id text,
    next_lesson_id text,
    completed_weight integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.course_progress OWNER TO neondb_owner;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.courses (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    thumbnail_url text,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    course_type text NOT NULL,
    language text NOT NULL,
    max_level text NOT NULL,
    min_level text NOT NULL,
    topics text[],
    is_premium boolean DEFAULT false NOT NULL,
    status public."ContentStatus" DEFAULT 'draft'::public."ContentStatus" NOT NULL,
    total_weight integer DEFAULT 0
);


ALTER TABLE public.courses OWNER TO neondb_owner;

--
-- Name: essay_hashtags; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.essay_hashtags (
    id text NOT NULL,
    essay_id text NOT NULL,
    hashtag_id text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.essay_hashtags OWNER TO neondb_owner;

--
-- Name: essays; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.essays (
    id text NOT NULL,
    title text NOT NULL,
    upvote_count integer DEFAULT 0 NOT NULL,
    summary text,
    content text NOT NULL,
    cover_url text,
    language text NOT NULL,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    space_id text NOT NULL,
    status public."ContentStatus" NOT NULL
);


ALTER TABLE public.essays OWNER TO neondb_owner;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.hashtags (
    id text NOT NULL,
    name text NOT NULL,
    usage_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.hashtags OWNER TO neondb_owner;

--
-- Name: lesson_comments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.lesson_comments (
    id text NOT NULL,
    lesson_id text NOT NULL,
    created_by text NOT NULL,
    content text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.lesson_comments OWNER TO neondb_owner;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.lessons (
    id text NOT NULL,
    unit_id text NOT NULL,
    title text NOT NULL,
    summary text,
    content jsonb NOT NULL,
    order_index integer NOT NULL,
    is_premium boolean DEFAULT false NOT NULL,
    is_required boolean DEFAULT true NOT NULL,
    status public."ContentStatus" DEFAULT 'draft'::public."ContentStatus" NOT NULL,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    lesson_weight integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.lessons OWNER TO neondb_owner;

--
-- Name: notes; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.notes (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    is_bookmarked boolean DEFAULT false NOT NULL,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    deleted_at timestamp(3) without time zone,
    space_id text,
    tags text[] DEFAULT ARRAY[]::text[],
    lesson_id text NOT NULL,
    course_id text,
    unit_id text
);


ALTER TABLE public.notes OWNER TO neondb_owner;

--
-- Name: reference_data; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.reference_data (
    id text NOT NULL,
    type text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    metadata jsonb,
    is_active boolean DEFAULT true NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.reference_data OWNER TO neondb_owner;

--
-- Name: space_courses; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.space_courses (
    id text NOT NULL,
    space_id text NOT NULL,
    course_id text NOT NULL,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.space_courses OWNER TO neondb_owner;

--
-- Name: spaces; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.spaces (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    current_level text NOT NULL,
    target_level text NOT NULL,
    language text NOT NULL,
    target text NOT NULL,
    deleted_at timestamp(3) without time zone,
    topics text[]
);


ALTER TABLE public.spaces OWNER TO neondb_owner;

--
-- Name: subscription_payments; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subscription_payments (
    id text NOT NULL,
    subscription_id text NOT NULL,
    amount numeric(65,30) NOT NULL,
    payment_type public."PaymentType" NOT NULL,
    payment_date timestamp(3) without time zone NOT NULL,
    status text NOT NULL
);


ALTER TABLE public.subscription_payments OWNER TO neondb_owner;

--
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.subscriptions (
    id text NOT NULL,
    user_id text NOT NULL,
    type public."SubscriptionType" NOT NULL,
    start_date timestamp(3) without time zone NOT NULL,
    end_date timestamp(3) without time zone,
    status text NOT NULL,
    correction_balance integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.subscriptions OWNER TO neondb_owner;

--
-- Name: units; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.units (
    id text NOT NULL,
    course_id text NOT NULL,
    title text NOT NULL,
    order_index integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    created_by text NOT NULL,
    is_premium boolean DEFAULT false NOT NULL
);


ALTER TABLE public.units OWNER TO neondb_owner;

--
-- Name: user_activities; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.user_activities (
    "time" timestamp with time zone NOT NULL,
    user_id uuid NOT NULL,
    activity_count integer DEFAULT 1,
    streak_count integer DEFAULT 0
);


ALTER TABLE public.user_activities OWNER TO neondb_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.users (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password_hash text,
    role public."UserRole" DEFAULT 'user'::public."UserRole" NOT NULL,
    auth_provider public."AuthProvider" DEFAULT 'local'::public."AuthProvider" NOT NULL,
    auth_provider_id text,
    first_name text,
    last_name text,
    profile_picture text,
    is_email_verified boolean DEFAULT false NOT NULL,
    last_login timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    native_language text NOT NULL,
    deleted_at timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO neondb_owner;

--
-- Name: vocabularies; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.vocabularies (
    id text NOT NULL,
    space_id text NOT NULL,
    term text NOT NULL,
    example_sentence text,
    reference_link text,
    reference_name text,
    repetition_level integer DEFAULT 0 NOT NULL,
    next_review timestamp(3) without time zone,
    created_by text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    image_url text,
    deleted_at timestamp(3) without time zone,
    meaning text[],
    tags text[] DEFAULT ARRAY[]::text[]
);


ALTER TABLE public.vocabularies OWNER TO neondb_owner;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3e95b4c7-85bd-45a6-8a91-87f1f0b9bfc2	3039fcb14cb52f0637387e53cf190709ee2ed73034994cc7e7f7c7544051682d	2024-11-29 15:37:40.143579+00	20241129153739_add_course_info_to_note	\N	\N	2024-11-29 15:37:39.937015+00	1
3b749b6a-bd7e-43df-9483-482c6b29707c	f76e26c53c0e01532e66252cd668d4b30526b91526c50750ad110eb1d5c521d6	2024-11-29 15:37:13.723909+00	20241029161151_init	\N	\N	2024-11-29 15:37:13.492041+00	1
8c894a23-8dd4-4830-a06f-5a1778d521de	2ca7bb4cbdfdfcb2abfaac5ab6a6f7628ffa85b62b5f90603a06ccb6a8a034bd	2024-11-29 15:37:17.987616+00	20241116100503_update_course	\N	\N	2024-11-29 15:37:17.708964+00	1
6d106854-b0e6-4deb-8c6e-4dee8f742c00	63c07adb4aa96e23ac0d0861f5559bd472ab16fe7ed302ea384b8e90e53d285a	2024-11-29 15:37:14.03135+00	20241029161717_add_index	\N	\N	2024-11-29 15:37:13.831861+00	1
871239d2-be2e-4359-8ea9-a1048588c9c9	08088b1c6257e865d93a4c30a4df12097c5b9b4c72c911a63fda6bbe5074aae2	2024-11-29 15:37:14.368583+00	20241101160842_remove_usage_count	\N	\N	2024-11-29 15:37:14.101545+00	1
f6a30b27-ab8f-465f-aa7c-3c4868ed9900	b98f70a835333741c064bfcd03b2bc298fe88057d0fa3eedbf14a12e4a73e4a4	2024-11-29 15:37:20.689188+00	20241122134411_change_json_to_string_array	\N	\N	2024-11-29 15:37:20.42977+00	1
79a69f87-df95-4f18-9a01-0d26563242bd	1db3af663864e227e713a0888611ecc2df5e9cf346552740ee362a24c740ddd7	2024-11-29 15:37:14.697201+00	20241111061742_update_feat_course	\N	\N	2024-11-29 15:37:14.438458+00	1
716eb282-035b-46e2-be9b-d7f0e46e20c7	4bd147db82dec5eb3b5a2f48911e071f12a812d5017e8b5eeafe2e0f5d2dd58d	2024-11-29 15:37:18.315942+00	20241116104707_add_created_by_to_unit	\N	\N	2024-11-29 15:37:18.08765+00	1
f8632f71-c42e-45c5-a726-5fc7bc61a4f0	9c7ff4232fe76f4efe70ec54d88bcfc77745fa87ee3f95e15307454b26194ec1	2024-11-29 15:37:15.027007+00	20241111071919_change_level_name	\N	\N	2024-11-29 15:37:14.796348+00	1
e1480923-a824-4571-9454-bf4a9decf049	9e388d1757c420862f83df038cc0ee1c1a0079a7b0ba9771d239a12e7601c4bf	2024-11-29 15:37:15.361246+00	20241111133740_enhance_space	\N	\N	2024-11-29 15:37:15.127966+00	1
f590b766-bebe-408a-a403-df79a77f8c2c	05772d12efc7526dff6208cbff1713f189621436435b4b8211652044f523bebb	2024-11-29 15:37:15.719898+00	20241111153208_missing_index_incorrect	\N	\N	2024-11-29 15:37:15.461471+00	1
56a8e453-e9b8-418a-8e45-18e635cb0aa7	0a544b8179021d054f3a3b318fe714935a506d66a7f3d8a028c62c508a87060f	2024-11-29 15:37:18.647706+00	20241116150718_add_subscription_feature	\N	\N	2024-11-29 15:37:18.418783+00	1
c88d73da-d090-4086-9ffa-b4cfa15a375d	2caf7a17733560806e417d105dae608ed98564f8ef5a2ed86ec072a85ed4b183	2024-11-29 15:37:16.020779+00	20241111155230_rating_using_float	\N	\N	2024-11-29 15:37:15.789723+00	1
41fdc26c-08b8-4e3b-aa83-1106a7386a76	bfb23cd40b5b20176c6851c0e7e738cf79de4d0b114901a9c7591f5d790b7882	2024-11-29 15:37:16.2958+00	20241112170626_update_schema_for_course_progress	\N	\N	2024-11-29 15:37:16.092896+00	1
a29a7148-f898-4592-b437-1f0f3bca650c	4644907b0cdc0b52b488b50e09392567129c06335a1dc0c70eeda7c6665d7039	2024-11-29 15:37:16.598875+00	20241114105113_add_activity_model	\N	\N	2024-11-29 15:37:16.369499+00	1
3ecd5931-41c5-4d36-b6a6-4d9d153654a6	c9aca5848f7008c5573b11a5d503b6ad2893c020d535e961d2422877f56cc227	2024-11-29 15:37:18.983606+00	20241116164956_add_is_premium_for_unit	\N	\N	2024-11-29 15:37:18.746261+00	1
51b0046b-babb-48e3-a753-24011e53d7f2	9c2664b66f6f22e8366493fd22a08cb15f200c55ef081caeb063d1b94ea3d000	2024-11-29 15:37:16.929787+00	20241114120238_add_reference_data	\N	\N	2024-11-29 15:37:16.696447+00	1
9dbd23ed-b71d-4be4-8b81-95759f85cae1	694946cf79e2ceb5b17b006933d09a58e219f9fd7cbc7a7a7727dac86a9013f5	2024-11-29 15:37:17.263627+00	20241114134053_add_soft_delete	\N	\N	2024-11-29 15:37:17.031155+00	1
e27d9ed7-cb2c-4901-b588-f8c77f5cf73c	5592ba0235328e9b2b3d2c390be0f364aebd80ca2a3e6e7da86a12f9acd8f83f	2024-11-29 15:37:20.989022+00	20241129040614_change_unit_to_lesson	\N	\N	2024-11-29 15:37:20.758712+00	1
918b9268-f5f9-455f-8927-9819a2a062ce	19489e87c2e79be93def3abcaf0c265846589179ca817a2024da75059df8cbe2	2024-11-29 15:37:17.610511+00	20241116094813_add_course_filter_feild	\N	\N	2024-11-29 15:37:17.362317+00	1
0d45071a-db5d-4ae3-9714-229ed66ec2f9	da97dfe2922ea59ea52d0bcaae697718ce78967f0f698521020a9063987ac62e	2024-11-29 15:37:19.310003+00	20241116172648_remove_price_of_course	\N	\N	2024-11-29 15:37:19.083335+00	1
3aacab20-f5e0-45b3-9402-aab42b8476a2	8e3c0b34d225fd6a608bde749a17b772d354b71d2a0431f8a85350bbe8c00cd9	2024-11-29 15:37:19.667495+00	20241118095241_simplify_course_progress	\N	\N	2024-11-29 15:37:19.409516+00	1
2828f93f-e9c8-43c1-8eea-dd02941a7cfa	eab5285505645e553cc82d4fdc55643c7dcb08d241cf1ef6e668c686cfb91535	2024-11-29 15:37:19.973112+00	20241118135555_add_is_premium_course	\N	\N	2024-11-29 15:37:19.736866+00	1
a47dbc66-f025-468d-8d61-8c6c085fc979	ca5c49d3fef00ff79d2ed9122aa73dc92ab40a36b658f6dcab8d944fde96dac3	2024-11-29 15:37:21.286132+00	20241129094622_	\N	\N	2024-11-29 15:37:21.086587+00	1
1517bafc-c4be-4563-8b9d-d0f514abbfbc	5bcb3b2bc4965e52c55ba51123408dee83a4189cb165485a9df856965e92e02c	2024-11-29 15:37:20.329209+00	20241121165518_change_meaning_vocab_to_string_array	\N	\N	2024-11-29 15:37:20.07117+00	1
d018cb00-6a30-4400-b8f8-c8d0f1c838cb	106e373f4096273036bb65b1a3da77b147c81f925831f67b5a2d1bf01edd5683	2024-11-29 15:37:21.614237+00	20241129095749_add_missing_lesson_weight	\N	\N	2024-11-29 15:37:21.385819+00	1
5e3f53e5-f0da-4ae7-9953-b0a82e35c821	97b7b02cd221a610825fc5a1872aa558430b4e06525fd602db4fff5934377c19	2024-11-29 15:37:21.916943+00	20241129101502_add_missing_completed_weight	\N	\N	2024-11-29 15:37:21.713134+00	1
\.


--
-- Data for Name: correction_credits; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.correction_credits (id, user_id, amount, price, payment_id, payment_type, expire_date, created_at) FROM stdin;
520a8f92-8d8c-4ad5-9326-bd03840fad64	94ea8ac7-b150-4a96-919d-67927b360ef7	10	19.990000000000000000000000000000	\N	STRIPE	2025-02-27 15:42:54.158	2024-11-29 15:42:54.159
\.


--
-- Data for Name: correction_replies; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.correction_replies (id, correction_id, comment, created_by, created_at, updated_at) FROM stdin;
c5f67f7f-c7c2-413f-8d12-8539a8e2c1cb	b4a37e28-3b16-40ff-ab15-66163747a57d	Thank you for the helpful feedback!	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:59.233	2024-11-29 15:42:59.233
\.


--
-- Data for Name: correction_sentences; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.correction_sentences (id, original_text, corrected_text, explanation, is_correct, rating, created_at, updated_at, correction_id, index) FROM stdin;
918fd84b-8250-479e-ace5-ce273381f8bb	I have learn English for three years.	I have been learning English for three years.	Use present perfect continuous for ongoing actions that started in the past.	f	4	2024-11-29 15:42:58.82	2024-11-29 15:42:58.82	b4a37e28-3b16-40ff-ab15-66163747a57d	0
7e5f7ea0-3931-410d-bd1e-23acdd12e6a8	It has been an amazing journey with many challenges and rewards.	\N	This sentence is perfect!	t	5	2024-11-29 15:42:58.82	2024-11-29 15:42:58.82	b4a37e28-3b16-40ff-ab15-66163747a57d	1
\.


--
-- Data for Name: corrections; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.corrections (id, essay_id, overall_comment, rating, created_by, created_at, updated_at, deleted_at) FROM stdin;
b4a37e28-3b16-40ff-ab15-66163747a57d	ea170629-38a1-4027-88f2-d70b45f42eb6	Good effort! Here are some suggestions for improvement.	4	8f162ff7-572a-4855-a8db-f11e28001ff1	2024-11-29 15:42:58.82	2024-11-29 15:42:58.82	\N
\.


--
-- Data for Name: course_progress; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.course_progress (id, user_id, course_id, current_unit_id, last_accessed_at, completed_units, next_unit_id, completed_lessons, current_lesson_id, next_lesson_id, completed_weight) FROM stdin;
bb9bd309-21c2-4dda-83b4-0a82dc2a8db2	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	bd267506-ada5-486f-85d0-c42f52183b66	f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2	2024-12-02 18:34:58.791	{}	\N	{}	72cf0b37-beba-4244-b89b-e9b8e01c6903	\N	0
721aa379-8b0f-4610-b79f-999709cc3238	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	38c715e6-d077-449f-8243-f2eda3cf2ca6	9bebcc56-a45c-4218-8827-668cfdce6a5d	2024-12-02 18:35:19.147	{}	\N	{}	757a6d7c-9949-49be-935a-99577ff79183	\N	0
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.courses (id, title, description, thumbnail_url, created_by, created_at, updated_at, deleted_at, course_type, language, max_level, min_level, topics, is_premium, status, total_weight) FROM stdin;
bd267506-ada5-486f-85d0-c42f52183b66	English Grammar Fundamentals	<p dir="auto">Master the basics of English grammar</p>	https://utfs.io/a/ubp4bdepbl/fkClDhMQd7TECKUoqJdW9qVBKdfQXrZUp7I62zcYxwjlieoN	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:54.396	2024-12-02 14:12:44.353	\N	IELTS	VIETNAMESE	ELEMENTARY	ELEMENTARY	{ACADEMIC,DAILY_LIFE,TRAVEL}	t	published	24
38c715e6-d077-449f-8243-f2eda3cf2ca6	Luyện tiếng Anh qua chuyện cười	<p dir="auto">Khóa học giúp bạn học tiếng Anh thông qua các câu chuyện cười ngắn, vui nhộn, và đầy ý nghĩa. Phát triển từ vựng, kỹ năng đọc hiểu và luyện tập giao tiếp một cách thú vị.</p>	https://utfs.io/a/ubp4bdepbl/fkClDhMQd7TEpYiWe13PIifvjaHe7EKlAskpzBLTt5w13C8q	492c4fbf-614e-45a3-be14-b19775194eac	2024-12-02 14:29:26.681	2024-12-02 16:10:51.954	\N	COMMUNICATION	ENGLISH	INTERMEDIATE	BEGINNER	{DAILY_LIFE}	t	published	0
\.


--
-- Data for Name: essay_hashtags; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.essay_hashtags (id, essay_id, hashtag_id, created_at) FROM stdin;
ed4a4c7c-8608-46e3-a03a-f3416090703f	ea170629-38a1-4027-88f2-d70b45f42eb6	394d8cec-e98a-436c-ba0c-3b9df182cfc9	2024-11-29 15:42:57.816
\.


--
-- Data for Name: essays; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.essays (id, title, upvote_count, summary, content, cover_url, language, created_by, created_at, updated_at, deleted_at, space_id, status) FROM stdin;
ea170629-38a1-4027-88f2-d70b45f42eb6	My Journey Learning English	0	A personal reflection on learning English	I have been learning English for three years. It has been an amazing journey with many challenges and rewards.	\N	ENGLISH	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:57.547	2024-11-29 15:42:57.547	\N	6a477dc9-3438-41b1-93b6-b26aaa30b258	published
\.


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.hashtags (id, name, usage_count, created_at, updated_at) FROM stdin;
394d8cec-e98a-436c-ba0c-3b9df182cfc9	technology	0	2024-11-29 15:42:57.358	2024-11-29 15:42:57.358
37f9420b-7944-48a2-bfe0-299a27095e0f	education	0	2024-11-29 15:42:57.43	2024-11-29 15:42:57.43
0437f418-3862-4779-9f9b-246ea9d8d8f9	ielts	0	2024-11-29 15:42:57.468	2024-11-29 15:42:57.468
677f93c2-a0cc-4736-8fd4-961e95461cba	grammar	0	2024-11-29 15:42:57.511	2024-11-29 15:42:57.511
\.


--
-- Data for Name: lesson_comments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.lesson_comments (id, lesson_id, created_by, content, created_at, updated_at) FROM stdin;
202d2389-02c8-4137-b114-89b8ea7a93f6	72cf0b37-beba-4244-b89b-e9b8e01c6903	94ea8ac7-b150-4a96-919d-67927b360ef7	This lesson was very helpful in understanding present simple tense.	2024-11-29 15:42:56.102	2024-11-29 15:42:56.102
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.lessons (id, unit_id, title, summary, content, order_index, is_premium, is_required, status, created_by, created_at, updated_at, lesson_weight) FROM stdin;
43ac8511-3b9b-4c47-9d8b-49dbe8fe198b	196cd93f-25fd-4878-97d3-7b3f3dc53bff	Present Continuous - Introduction	Learn the basics of Present Continuous tense	{"sections": [{"type": "text", "content": "The present continuous tense is used to describe temporary or changing situations, and to talk about actions that are happening at the moment of speaking."}, {"type": "example", "content": ["I am studying for a master degree.", "The company is building a new factory.", "They are planning a trip to Japan."]}, {"type": "exercise", "questions": [{"type": "multiple-choice", "options": ["I am play football.", "I am playing football.", "I playing football."], "question": "Which sentence uses Present Continuous correctly?", "correctAnswer": 1}]}]}	0	f	t	published	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:55.467	2024-12-01 03:54:34.083	6
72cf0b37-beba-4244-b89b-e9b8e01c6903	f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2	Present Simple - Introduction	<p><strong>Learn</strong> the <mark data-color="#D46B08" style="background-color: #D46B08; color: inherit">basics</mark> of Present Simple tense</p>	{"blocks": [{"id": "block-m473fkuyo22ct", "type": "text", "order": 0, "content": {"html": "<p dir=\\"auto\\">hello</p>"}}], "metadata": {"lastUpdated": "2024-12-02T17:37:00.906Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	0	f	t	published	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:55.162	2024-12-02 17:37:04.875	4
2afc4bdc-8cf4-41f2-bd4c-45546bd8c8e0	f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2	Past Simple - Introduction	<p>Learn the basics of Past Simple tense</p>	{"blocks": [{"id": "block-m473g6dawcgxa", "type": "text", "order": 0, "content": {"html": "<p dir=\\"auto\\">fsdfsdf</p>"}}, {"id": "block-m473p3qs66phg", "type": "quiz", "order": 1, "content": {"title": "", "questions": [{"id": "q-m473p3qspzu11", "options": [{"id": "opt-m473p3qsioc87", "text": "This à", "isCorrect": true}, {"id": "opt-m473p3qsbogbv", "text": "âfsadfasdfa", "isCorrect": false}], "question": "Hello", "explanation": "Thisas"}, {"id": "q-m473pvdtjp9vf", "options": [{"id": "opt-m473pvdt18ig1", "text": "1", "isCorrect": false}, {"id": "opt-m473pvdtstiyf", "text": "2", "isCorrect": false}], "question": "adadasd", "explanation": "1"}]}}, {"id": "block-m473r87s4utuo", "type": "dictation", "order": 2, "content": {"text": "<p dir=\\"auto\\">Hello today the weather is beautiful, would you like to walk to the park</p>", "audioUrl": "https://utfs.io/f/fkClDhMQd7TERjiqGdYWPY16CnpTL4HlG8fudoAmM3cqswIE"}}], "metadata": {"lastUpdated": "2024-12-02T14:07:44.098Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	1	t	t	published	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:55.691	2024-12-02 14:07:57.268	4
2df916f6-4945-4ea0-ba3d-d3d78a9bbc55	f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2	Past Continuous - Introduction	Learn the basics of Past Continuous tense	{"sections": [{"type": "text", "content": "The past continuous tense is used to describe actions that were in progress at a specific point in the past."}, {"type": "example", "content": ["I was studying for a master degree at 8pm last night.", "The company was building a new factory in 2010.", "They were planning a trip to Japan last year."]}, {"type": "exercise", "questions": [{"type": "multiple-choice", "options": ["I was play football at 8pm last night.", "I was playing football at 8pm last night.", "I playing football at 8pm last night."], "question": "Which sentence uses Past Continuous correctly?", "correctAnswer": 1}]}]}	2	f	t	published	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:55.89	2024-12-01 03:54:34.083	6
757a6d7c-9949-49be-935a-99577ff79183	9bebcc56-a45c-4218-8827-668cfdce6a5d	The talking parrot	<p>Một câu chuyện hài hước về chú vẹt biết nói và phản ứng bất ngờ của chủ nhân</p>	{"blocks": [{"id": "block-m475sl0sidvn1", "type": "text", "order": 0, "content": {"html": "<h4 dir=\\"auto\\">Vocabulary List</h4><ul><li><p dir=\\"auto\\"><strong>Pet shop</strong> - cửa hàng thú cưng</p></li><li><p dir=\\"auto\\"><strong>Shopkeeper</strong> - chủ cửa hàng</p></li><li><p dir=\\"auto\\"><strong>Parrot</strong> - con vẹt</p></li><li><p dir=\\"auto\\"><strong>Speak</strong> - nói</p></li><li><p dir=\\"auto\\"><strong>Excited</strong> - phấn khích</p></li><li><p dir=\\"auto\\"><strong>Reply</strong> - trả lời</p></li><li><p dir=\\"auto\\"><strong>Never</strong> - không bao giờ</p></li><li><p dir=\\"auto\\"><strong>Told</strong> - đã nói (quá khứ của \\"tell\\")</p></li></ul><p dir=\\"auto\\"></p>"}}, {"id": "block-m475fit42apph", "type": "dictation", "order": 1, "content": {"text": "<p>A man goes to a pet shop and buys a parrot. The shopkeeper says, 'This parrot can speak 5 languages!' Excited, the man brings the parrot home and asks, 'What is your name?' The parrot replies, 'I don't know, you never told me!</p>", "audioUrl": "https://utfs.io/f/fkClDhMQd7TEhczv4c20jGCrUK3yIO18HXvFLsN7Wm5MwPha"}}, {"id": "block-m475mc9x1cp2b", "type": "quiz", "order": 2, "content": {"title": "Quiz", "questions": [{"id": "q-m475mc9xthj1w", "options": [{"id": "opt-m475mc9xxwp4k", "text": "A store for clothes", "isCorrect": false}, {"id": "opt-m475mc9xpn7re", "text": "A store for pets", "isCorrect": true}, {"id": "opt-m475yey8oxdjd", "text": "A toy shop", "isCorrect": false}], "question": "What does \\"pet shop\\" mean?", "explanation": "\\nA store for pets is the right answer\\n"}, {"id": "q-m475z37qduxgw", "options": [{"id": "opt-m475z37q3eco7", "text": " Bored", "isCorrect": false}, {"id": "opt-m475z37q3s9sg", "text": "Happy and enthusiastic", "isCorrect": true}, {"id": "opt-m475zogszu53f", "text": "Tired", "isCorrect": false}], "question": "What is the meaning of \\"excited\\"?", "explanation": "Happy and enthusiastic is the right answer"}]}}], "metadata": {"lastUpdated": "2024-12-02T17:36:24.450Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	0	f	t	draft	492c4fbf-614e-45a3-be14-b19775194eac	2024-12-02 15:03:58.259	2024-12-02 17:36:28.042	10
9c403914-5cf0-4764-8dc5-69659001eebd	558b6511-7d30-45f0-8d28-ff7e28a88cc9	The Forgetful Shopper	<p>A funny story about a man’s unusual grocery shopping experience.</p>	{"blocks": [{"id": "block-m477w3s16lvhf", "type": "text", "order": 0, "content": {"html": "<h4 dir=\\"auto\\">Vocabulary List</h4><ul><li><p dir=\\"auto\\"><strong>Grocery store</strong>: Cửa hàng tạp hóa</p></li><li><p dir=\\"auto\\"><strong>Shopping list</strong>: Danh sách mua sắm</p></li><li><p dir=\\"auto\\"><strong>Loaf of bread</strong>: Ổ bánh mì</p></li><li><p dir=\\"auto\\"><strong>Forget</strong>: Quên</p></li><li><p dir=\\"auto\\"><strong>Stuff</strong>: Đồ đạc, các món đồ</p></li><li><p dir=\\"auto\\"><strong>Rest</strong>: Phần còn lại</p></li><li><p dir=\\"auto\\"><strong>Unusual</strong>: Khác thường</p></li><li><p dir=\\"auto\\"><strong>Hours</strong>: Nhiều giờ</p></li><li><p dir=\\"auto\\"><strong>Bring home</strong>: Mang về nhà</p></li><li><p dir=\\"auto\\"><strong>Experience</strong>: Trải nghiệm</p></li></ul><p dir=\\"auto\\"></p>"}}, {"id": "block-m477xl7xs8ujv", "type": "dictation", "order": 1, "content": {"text": "<p>A man went to the grocery store with a long shopping list. After a few hours, he came home with nothing but a loaf of bread. His wife asked, 'Where’s the rest of the stuff on the list?' He said, 'Oh no, I forgot the list at the store!</p>", "audioUrl": "https://utfs.io/f/fkClDhMQd7TEnGw1l5zXUtQ8zNR7ZOGJrkqmh9b4YgKwsl5S"}}], "metadata": {"lastUpdated": "2024-12-02T16:04:02.625Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	0	f	t	draft	492c4fbf-614e-45a3-be14-b19775194eac	2024-12-02 16:02:48.39	2024-12-02 16:04:04.893	10
8fa69bb5-45a1-4e50-8fa8-1f6d9dc0009a	cb84b328-57bd-4d42-b1f3-8ebd2a820e72	The Clever Employee	<p>A light-hearted story about an employee outsmarting the boss.</p>	{"blocks": [{"id": "block-m47821ijtz4xp", "type": "text", "order": 0, "content": {"html": "<h4 dir=\\"auto\\">Vocabulary List</h4><ul><li><p dir=\\"auto\\"><strong>Employee</strong>: Nhân viên</p></li><li><p dir=\\"auto\\"><strong>Boss</strong>: Sếp</p></li><li><p dir=\\"auto\\"><strong>Day off</strong>: Ngày nghỉ</p></li><li><p dir=\\"auto\\"><strong>Grandma</strong>: Bà nội/bà ngoại</p></li><li><p dir=\\"auto\\"><strong>Birthday</strong>: Sinh nhật</p></li><li><p dir=\\"auto\\"><strong>Invite</strong>: Mời</p></li><li><p dir=\\"auto\\"><strong>Attend</strong>: Tham gia</p></li><li><p dir=\\"auto\\"><strong>Important</strong>: Quan trọng</p></li><li><p dir=\\"auto\\"><strong>Office</strong>: Văn phòng</p></li><li><p dir=\\"auto\\"><strong>Reply</strong>: Đáp lại</p></li></ul><p dir=\\"auto\\"></p>"}}, {"id": "block-m47824xq6mi7f", "type": "dictation", "order": 1, "content": {"text": "<p>An employee walked into his boss’s office and asked, 'Can I have a day off next week to attend my grandma’s birthday?' The boss replied, 'Why didn’t your grandma invite me?' The employee quickly said, 'She only wants important people to be there.</p>", "audioUrl": "https://utfs.io/f/fkClDhMQd7TE6lO7t2a9HvtmCzUZoWN10p2qhedE87yuTDxX"}}, {"id": "block-m4784m9ucttud", "type": "quiz", "order": 2, "content": {"title": "Quiz", "questions": [{"id": "q-m4784m9uq8j2t", "options": [{"id": "opt-m4784m9u1aq5a", "text": "grandma", "isCorrect": false}, {"id": "opt-m4784m9ud4w6t", "text": "friend", "isCorrect": false}], "question": "Fill in the blank: The employee asked for a day off to attend his ___’s birthday.", "explanation": "The story says it was his grandma’s birthday."}]}}], "metadata": {"lastUpdated": "2024-12-02T16:08:05.308Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	0	t	t	draft	492c4fbf-614e-45a3-be14-b19775194eac	2024-12-02 16:08:13.531	2024-12-02 16:08:13.531	10
7d4f29cd-37ca-4eea-bed0-3ceec6824b51	9bebcc56-a45c-4218-8827-668cfdce6a5d	The Clever Dog	<p>It's a funny story about a dog's unexpected intelligence.</p>	{"blocks": [{"id": "block-m476201veoeuy", "type": "text", "order": 0, "content": {"html": "<h4 dir=\\"auto\\">Vocabulary List</h4><ul><li><p dir=\\"auto\\"><strong>Roof</strong>: Mái nhà</p></li><li><p dir=\\"auto\\"><strong>Rough</strong>: Nhám, ráp</p></li><li><p dir=\\"auto\\"><strong>Ruth</strong>: Tên của một cầu thủ bóng chày nổi tiếng</p></li><li><p dir=\\"auto\\"><strong>Bark</strong>: Tiếng sủa của chó</p></li><li><p dir=\\"auto\\"><strong>Sandpaper</strong>: Giấy nhám</p></li><li><p dir=\\"auto\\"><strong>Kick out</strong>: Đuổi ra ngoài</p></li><li><p dir=\\"auto\\"><strong>Intelligence</strong>: Sự thông minh</p></li><li><p dir=\\"auto\\"><strong>Baseball</strong>: Bóng chày</p></li><li><p dir=\\"auto\\"><strong>Greatest</strong>: Vĩ đại nhất</p></li><li><p dir=\\"auto\\"><strong>Context</strong>: Bối cảnh</p></li></ul><p dir=\\"auto\\"></p>"}}, {"id": "block-m47628fdtutp8", "type": "dictation", "order": 1, "content": {"text": "<p>Once upon a time, a man brought his dog to a bar. He said, \\"This is the smartest dog in the world! Watch this.\\" The man asked the dog, \\"What's on top of a house?\\" The dog barked, \\"Roof!\\" The man continued, \\"What's sandpaper like?\\" The dog replied, \\"Rough!\\" Finally, the man asked, \\"Who was the greatest baseball player?\\" The dog barked, \\"Ruth!\\" Everyone laughed, but one man said, \\"That's not funny,\\" and kicked them out of the bar. The dog looked at his owner as they sat outside and said, \\"Was it Wagner?\\"</p>", "audioUrl": "https://utfs.io/f/fkClDhMQd7TEYCWcICbfLrZaDXHVYA8zUPtyj167pCw9Rocu"}}, {"id": "block-m477na03h4y8o", "type": "quiz", "order": 2, "content": {"title": "Quiz", "questions": [{"id": "q-m477na03b5x5j", "options": [{"id": "opt-m477na03b4i7z", "text": "tree", "isCorrect": false}, {"id": "opt-m477na03hk1kd", "text": "house", "isCorrect": false}], "question": "The man said \\"What’s on top of a ___?", "explanation": "The question referred to a house."}]}}], "metadata": {"lastUpdated": "2024-12-02T17:36:36.003Z", "updatedById": "492c4fbf-614e-45a3-be14-b19775194eac"}}	1	f	t	draft	492c4fbf-614e-45a3-be14-b19775194eac	2024-12-02 15:58:23.022	2024-12-02 17:36:40.087	10
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.notes (id, title, content, is_bookmarked, created_by, created_at, updated_at, deleted_at, space_id, tags, lesson_id, course_id, unit_id) FROM stdin;
ce41583c-0211-49bd-816c-541a97c8d257	Test	<h1 dir="auto">Hi lelo</h1><p dir="auto">this is an note</p><p dir="auto"></p>	f	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 16:54:12.101	2024-12-02 16:54:49.948	2024-12-02 16:54:49.947	6a477dc9-3438-41b1-93b6-b26aaa30b258	{ada}	43ac8511-3b9b-4c47-9d8b-49dbe8fe198b	\N	\N
021215a9-4afb-4de4-a659-63c0f7c907c1	Ua	<h1 dir="auto">Hi lelo</h1><p dir="auto">this is an note</p><p dir="auto"></p>	f	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	2024-12-02 16:50:51.557	2024-12-02 16:54:52.566	2024-12-02 16:54:52.565	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	{ada}	43ac8511-3b9b-4c47-9d8b-49dbe8fe198b	\N	\N
864a39a0-412d-422b-ad6a-28a54c2bcea0	Key Grammar Points - Present Simple	<p dir="auto">1. Use for habits and routines 2. Use for ấgeneral truths 3. Third person singular adds -s 4. Common time expressions: always, usually, often, sometimes, never</p>	t	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:58.419	2024-12-02 18:42:18.563	2024-12-02 18:42:18.562	6a477dc9-3438-41b1-93b6-b26aaa30b258	{grammar,present-simple}	72cf0b37-beba-4244-b89b-e9b8e01c6903	bd267506-ada5-486f-85d0-c42f52183b66	196cd93f-25fd-4878-97d3-7b3f3dc53bff
1e1e0de3-46d6-4676-8ed4-aeaa740e7f2e	Key Grammar Points - Present Simple	<p dir="auto">1. Use for habits and routines 2. Use for ấgeneral truths 3. Third person singular adds -s 4. Common time expressions: always, usually, often, sometimes, never</p>	f	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	2024-12-02 18:43:01.039	2024-12-02 18:51:11.729	2024-12-02 18:51:11.728	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	{}	72cf0b37-beba-4244-b89b-e9b8e01c6903	\N	\N
dfc2f1df-e210-4541-8ef4-6f85bd66a70b	Key Grammar Points - Present Simple	<p dir="auto">1. Use for habits and routines 2. Use for ấgeneral truths 3. Third person singular adds -s 4. Common time expressions: always, usually, often, sometimes, never</p>	f	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	2024-12-02 18:55:44.64	2024-12-02 18:57:37.306	\N	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	{simple}	72cf0b37-beba-4244-b89b-e9b8e01c6903	bd267506-ada5-486f-85d0-c42f52183b66	f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2
569b6dc2-f0b7-4e88-acf6-8765c1a49c3d	Taking parot	<p dir="auto"><span>A man goes to a pet shop and buys a parrot. The shopkeeper says, 'This parrot can speak 5 languages!' Excited, the man brings the parrot home and asks, 'What is your name?' The parrot replies, 'I don't know, you never told me!</span></p>	f	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	2024-12-03 11:05:54.391	2024-12-03 11:05:54.391	\N	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	{parrot}	757a6d7c-9949-49be-935a-99577ff79183	38c715e6-d077-449f-8243-f2eda3cf2ca6	9bebcc56-a45c-4218-8827-668cfdce6a5d
\.


--
-- Data for Name: reference_data; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.reference_data (id, type, code, name, metadata, is_active, order_index, created_at, updated_at) FROM stdin;
47f4d523-5df5-4f09-95b4-7820d24876a3	language	ENGLISH	English	{"flag": "🇬🇧", "iso_code": "en", "native_name": "English"}	t	1	2024-11-29 15:42:52.906	2024-11-29 15:42:52.906
0ff6882d-9073-4a25-9630-66a387ab76b0	language	VIETNAMESE	Vietnamese	{"flag": "🇻🇳", "iso_code": "vi", "native_name": "Tiếng Việt"}	t	2	2024-11-29 15:42:52.977	2024-11-29 15:42:52.977
039005bb-bbbd-4dcc-8d63-83101620bd86	target	COMMUNICATION	Communication	{"description": "Focus on speaking and daily communication", "recommended_level": "INTERMEDIATE"}	t	1	2024-11-29 15:42:53.012	2024-11-29 15:42:53.012
1aff3786-a2c3-4eed-b3ac-e353572814f0	target	IELTS	IELTS Preparation	{"description": "Prepare for IELTS examination", "recommended_level": "INTERMEDIATE"}	t	2	2024-11-29 15:42:53.047	2024-11-29 15:42:53.047
3bbc00ad-a9fe-458d-99f7-ccf93a2aa47c	target	TOEIC	TOEIC Preparation	{"description": "Prepare for TOEIC examination", "recommended_level": "INTERMEDIATE"}	t	3	2024-11-29 15:42:53.081	2024-11-29 15:42:53.081
\.


--
-- Data for Name: space_courses; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.space_courses (id, space_id, course_id, joined_at) FROM stdin;
4a54c9b5-136d-4d52-a272-c4a447c0e7b9	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	bd267506-ada5-486f-85d0-c42f52183b66	2024-12-02 18:34:59.45
e8d80dfb-7a91-4159-b797-2fb5a48d6990	d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	38c715e6-d077-449f-8243-f2eda3cf2ca6	2024-12-02 18:35:20.715
\.


--
-- Data for Name: spaces; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.spaces (id, name, description, created_by, created_at, updated_at, current_level, target_level, language, target, deleted_at, topics) FROM stdin;
6a477dc9-3438-41b1-93b6-b26aaa30b258	IELTS Preparation Journey	My personal space for IELTS preparation	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:56.805	2024-11-29 15:42:56.805	INTERMEDIATE	ADVANCED	ENGLISH	IELTS	\N	{ACADEMIC,BUSINESS}
d47cb726-e7b6-40f2-a2a6-f92bccd30b4c	Giao tiếp	Học tiếng anh giao tiếp 	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	2024-12-02 16:09:53.125	2024-12-02 16:09:53.125	BEGINNER	INTERMEDIATE	ENGLISH	COMMUNICATION	\N	{DAILY_LIFE,TRAVEL}
\.


--
-- Data for Name: subscription_payments; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.subscription_payments (id, subscription_id, amount, payment_type, payment_date, status) FROM stdin;
4aef02d4-608b-4955-b720-6579e50073dc	dded0121-9d28-4918-822e-e4f8a9c13918	29.990000000000000000000000000000	STRIPE	2024-11-29 15:42:53.72	SUCCESS
cb818250-1124-4bb2-ba50-c97c5ab86093	8a8f870b-c947-4123-97cc-8b1f137f80d7	99.990000000000000000000000000000	STRIPE	2024-11-29 15:42:53.72	SUCCESS
\.


--
-- Data for Name: subscriptions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.subscriptions (id, user_id, type, start_date, end_date, status, correction_balance) FROM stdin;
dded0121-9d28-4918-822e-e4f8a9c13918	94ea8ac7-b150-4a96-919d-67927b360ef7	BASIC	2024-11-29 15:42:53.274	2024-12-29 15:42:53.274	ACTIVE	10
8a8f870b-c947-4123-97cc-8b1f137f80d7	8f162ff7-572a-4855-a8db-f11e28001ff1	PREMIUM	2024-11-29 15:42:53.274	2025-02-27 15:42:53.274	ACTIVE	50
\.


--
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.units (id, course_id, title, order_index, created_at, updated_at, created_by, is_premium) FROM stdin;
9bebcc56-a45c-4218-8827-668cfdce6a5d	38c715e6-d077-449f-8243-f2eda3cf2ca6	Joke about animals	0	2024-12-02 14:30:19.042	2024-12-02 15:59:21.937	492c4fbf-614e-45a3-be14-b19775194eac	f
558b6511-7d30-45f0-8d28-ff7e28a88cc9	38c715e6-d077-449f-8243-f2eda3cf2ca6	Joke about daily activity	1	2024-12-02 14:30:31.078	2024-12-02 15:59:37.334	492c4fbf-614e-45a3-be14-b19775194eac	f
cb84b328-57bd-4d42-b1f3-8ebd2a820e72	38c715e6-d077-449f-8243-f2eda3cf2ca6	Jokes about Work and Office Life	2	2024-12-02 14:30:39.649	2024-12-02 16:08:30.593	492c4fbf-614e-45a3-be14-b19775194eac	f
f8f3cb85-28ad-46dc-bb18-ef0ee75e02f2	bd267506-ada5-486f-85d0-c42f52183b66	Past Tense Mastery	0	2024-11-29 15:42:54.961	2024-12-02 17:37:10.038	94ea8ac7-b150-4a96-919d-67927b360ef7	f
196cd93f-25fd-4878-97d3-7b3f3dc53bff	bd267506-ada5-486f-85d0-c42f52183b66	Present Tense Mastery	1	2024-11-29 15:42:54.631	2024-12-01 03:54:34.083	94ea8ac7-b150-4a96-919d-67927b360ef7	f
\.


--
-- Data for Name: user_activities; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.user_activities ("time", user_id, activity_count, streak_count) FROM stdin;
2024-11-29 16:28:02.51041+00	94ea8ac7-b150-4a96-919d-67927b360ef7	16	1
2024-12-02 16:50:51.7821+00	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	8	1
2024-12-03 11:05:54.666296+00	7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	1	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.users (id, username, email, password_hash, role, auth_provider, auth_provider_id, first_name, last_name, profile_picture, is_email_verified, last_login, created_at, updated_at, native_language, deleted_at) FROM stdin;
94ea8ac7-b150-4a96-919d-67927b360ef7	test_user	test@gmail.com	$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci	user	local	\N	Student	One	https://example.com/student1.jpg	t	2024-11-29 15:42:52.075	2024-11-29 15:42:53.123	2024-11-29 15:42:53.123	VIETNAMESE	\N
8f162ff7-572a-4855-a8db-f11e28001ff1	teacher1	teacher@gmail.com	$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci	teacher	local	\N	Teacher	One	https://example.com/teacher1.jpg	t	2024-11-29 15:42:52.075	2024-11-29 15:42:53.203	2024-11-29 15:42:53.203	VIETNAMESE	\N
492c4fbf-614e-45a3-be14-b19775194eac	admin	admin@gmail.com	$2b$10$11zWAeJIiwBV7rI.TYlF4.nW/kLj67MvHs5j8BFcMeG9XgHXx8pci	admin	local	\N	Admin	One	https://example.com/admin1.jpg	t	2024-11-29 15:42:52.075	2024-11-29 15:42:53.239	2024-11-29 15:42:53.239	VIETNAMESE	\N
7f270a6a-3a0d-4462-8b20-a53e0c54c1ec	Minh Nhật Nguyễn (javier)	nhat1234559@gmail.com	\N	user	google	\N	Minh Nhật	Nguyễn	https://lh3.googleusercontent.com/a/ACg8ocKUVMge-piFhb8vLReOyn2KHsiRv5EU2hurWqM4eIJajYpyloWg=s96-c	f	\N	2024-12-02 16:09:20.359	2024-12-02 16:09:20.359	en	\N
\.


--
-- Data for Name: vocabularies; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.vocabularies (id, space_id, term, example_sentence, reference_link, reference_name, repetition_level, next_review, created_by, created_at, updated_at, image_url, deleted_at, meaning, tags) FROM stdin;
06b737ee-961c-4404-bfb9-dc7f762ffe86	6a477dc9-3438-41b1-93b6-b26aaa30b258	perseverance	Her perseverance in studying English paid off.	\N	\N	1	2024-11-29 17:00:00	94ea8ac7-b150-4a96-919d-67927b360ef7	2024-11-29 15:42:58.149	2024-11-29 16:55:11.261	https://example.com/vocab1.jpg	\N	{"the quality of continuing to try to achieve a particular aim despite difficulties","sự kiên trì"}	{important,academic}
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: correction_credits correction_credits_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_credits
    ADD CONSTRAINT correction_credits_pkey PRIMARY KEY (id);


--
-- Name: correction_replies correction_replies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_replies
    ADD CONSTRAINT correction_replies_pkey PRIMARY KEY (id);


--
-- Name: correction_sentences correction_sentences_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_sentences
    ADD CONSTRAINT correction_sentences_pkey PRIMARY KEY (id);


--
-- Name: corrections corrections_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.corrections
    ADD CONSTRAINT corrections_pkey PRIMARY KEY (id);


--
-- Name: course_progress course_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: essay_hashtags essay_hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essay_hashtags
    ADD CONSTRAINT essay_hashtags_pkey PRIMARY KEY (id);


--
-- Name: essays essays_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essays
    ADD CONSTRAINT essays_pkey PRIMARY KEY (id);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: lesson_comments lesson_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT lesson_comments_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: reference_data reference_data_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.reference_data
    ADD CONSTRAINT reference_data_pkey PRIMARY KEY (id);


--
-- Name: space_courses space_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.space_courses
    ADD CONSTRAINT space_courses_pkey PRIMARY KEY (id);


--
-- Name: spaces spaces_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spaces
    ADD CONSTRAINT spaces_pkey PRIMARY KEY (id);


--
-- Name: subscription_payments subscription_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_payments
    ADD CONSTRAINT subscription_payments_pkey PRIMARY KEY (id);


--
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- Name: units units_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


--
-- Name: user_activities user_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.user_activities
    ADD CONSTRAINT user_activities_pkey PRIMARY KEY ("time", user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: vocabularies vocabularies_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT vocabularies_pkey PRIMARY KEY (id);


--
-- Name: correction_replies_correction_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX correction_replies_correction_id_idx ON public.correction_replies USING btree (correction_id);


--
-- Name: correction_replies_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX correction_replies_created_by_idx ON public.correction_replies USING btree (created_by);


--
-- Name: correction_sentences_correction_id_index_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX correction_sentences_correction_id_index_idx ON public.correction_sentences USING btree (correction_id, index);


--
-- Name: corrections_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX corrections_created_by_idx ON public.corrections USING btree (created_by);


--
-- Name: corrections_essay_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX corrections_essay_id_idx ON public.corrections USING btree (essay_id);


--
-- Name: course_progress_course_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX course_progress_course_id_idx ON public.course_progress USING btree (course_id);


--
-- Name: course_progress_user_id_course_id_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX course_progress_user_id_course_id_key ON public.course_progress USING btree (user_id, course_id);


--
-- Name: course_progress_user_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX course_progress_user_id_idx ON public.course_progress USING btree (user_id);


--
-- Name: courses_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX courses_created_by_idx ON public.courses USING btree (created_by);


--
-- Name: courses_deleted_at_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX courses_deleted_at_idx ON public.courses USING btree (deleted_at);


--
-- Name: courses_status_language_min_level_max_level_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX courses_status_language_min_level_max_level_idx ON public.courses USING btree (status, language, min_level, max_level);


--
-- Name: essay_hashtags_essay_id_hashtag_id_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX essay_hashtags_essay_id_hashtag_id_key ON public.essay_hashtags USING btree (essay_id, hashtag_id);


--
-- Name: essays_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX essays_created_by_idx ON public.essays USING btree (created_by);


--
-- Name: essays_space_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX essays_space_id_idx ON public.essays USING btree (space_id);


--
-- Name: essays_status_language_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX essays_status_language_idx ON public.essays USING btree (status, language);


--
-- Name: hashtags_name_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX hashtags_name_idx ON public.hashtags USING btree (name);


--
-- Name: hashtags_name_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX hashtags_name_key ON public.hashtags USING btree (name);


--
-- Name: hashtags_usage_count_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX hashtags_usage_count_idx ON public.hashtags USING btree (usage_count);


--
-- Name: lesson_comments_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX lesson_comments_created_by_idx ON public.lesson_comments USING btree (created_by);


--
-- Name: lesson_comments_lesson_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX lesson_comments_lesson_id_idx ON public.lesson_comments USING btree (lesson_id);


--
-- Name: lessons_unit_id_is_premium_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX lessons_unit_id_is_premium_idx ON public.lessons USING btree (unit_id, is_premium);


--
-- Name: lessons_unit_id_order_index_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX lessons_unit_id_order_index_idx ON public.lessons USING btree (unit_id, order_index);


--
-- Name: notes_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX notes_created_by_idx ON public.notes USING btree (created_by);


--
-- Name: notes_lesson_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX notes_lesson_id_idx ON public.notes USING btree (lesson_id);


--
-- Name: notes_space_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX notes_space_id_idx ON public.notes USING btree (space_id);


--
-- Name: reference_data_type_code_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX reference_data_type_code_key ON public.reference_data USING btree (type, code);


--
-- Name: reference_data_type_is_active_order_index_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX reference_data_type_is_active_order_index_idx ON public.reference_data USING btree (type, is_active, order_index);


--
-- Name: space_courses_course_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX space_courses_course_id_idx ON public.space_courses USING btree (course_id);


--
-- Name: space_courses_space_id_course_id_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX space_courses_space_id_course_id_key ON public.space_courses USING btree (space_id, course_id);


--
-- Name: space_courses_space_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX space_courses_space_id_idx ON public.space_courses USING btree (space_id);


--
-- Name: spaces_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX spaces_created_by_idx ON public.spaces USING btree (created_by);


--
-- Name: spaces_deleted_at_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX spaces_deleted_at_idx ON public.spaces USING btree (deleted_at);


--
-- Name: spaces_language_target_current_level_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX spaces_language_target_current_level_idx ON public.spaces USING btree (language, target, current_level);


--
-- Name: subscriptions_user_id_status_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX subscriptions_user_id_status_idx ON public.subscriptions USING btree (user_id, status);


--
-- Name: units_course_id_order_index_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX units_course_id_order_index_idx ON public.units USING btree (course_id, order_index);


--
-- Name: units_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX units_created_by_idx ON public.units USING btree (created_by);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- Name: vocabularies_created_by_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX vocabularies_created_by_idx ON public.vocabularies USING btree (created_by);


--
-- Name: vocabularies_next_review_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX vocabularies_next_review_idx ON public.vocabularies USING btree (next_review);


--
-- Name: vocabularies_space_id_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX vocabularies_space_id_idx ON public.vocabularies USING btree (space_id);


--
-- Name: vocabularies_term_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX vocabularies_term_idx ON public.vocabularies USING btree (term);


--
-- Name: correction_credits correction_credits_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_credits
    ADD CONSTRAINT correction_credits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: correction_replies correction_replies_correction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_replies
    ADD CONSTRAINT correction_replies_correction_id_fkey FOREIGN KEY (correction_id) REFERENCES public.corrections(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: correction_replies correction_replies_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_replies
    ADD CONSTRAINT correction_replies_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: correction_sentences correction_sentences_correction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.correction_sentences
    ADD CONSTRAINT correction_sentences_correction_id_fkey FOREIGN KEY (correction_id) REFERENCES public.corrections(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: corrections corrections_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.corrections
    ADD CONSTRAINT corrections_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: corrections corrections_essay_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.corrections
    ADD CONSTRAINT corrections_essay_id_fkey FOREIGN KEY (essay_id) REFERENCES public.essays(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course_progress course_progress_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: course_progress course_progress_current_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_current_lesson_id_fkey FOREIGN KEY (current_lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: course_progress course_progress_current_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_current_unit_id_fkey FOREIGN KEY (current_unit_id) REFERENCES public.units(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: course_progress course_progress_next_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_next_lesson_id_fkey FOREIGN KEY (next_lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: course_progress course_progress_next_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_next_unit_id_fkey FOREIGN KEY (next_unit_id) REFERENCES public.units(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: course_progress course_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.course_progress
    ADD CONSTRAINT course_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: courses courses_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: essay_hashtags essay_hashtags_essay_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essay_hashtags
    ADD CONSTRAINT essay_hashtags_essay_id_fkey FOREIGN KEY (essay_id) REFERENCES public.essays(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: essay_hashtags essay_hashtags_hashtag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essay_hashtags
    ADD CONSTRAINT essay_hashtags_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: essays essays_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essays
    ADD CONSTRAINT essays_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: essays essays_space_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.essays
    ADD CONSTRAINT essays_space_id_fkey FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lesson_comments lesson_comments_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT lesson_comments_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lesson_comments lesson_comments_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lesson_comments
    ADD CONSTRAINT lesson_comments_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lessons lessons_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lessons lessons_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notes notes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notes notes_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notes notes_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notes notes_space_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_space_id_fkey FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: notes notes_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: space_courses space_courses_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.space_courses
    ADD CONSTRAINT space_courses_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: space_courses space_courses_space_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.space_courses
    ADD CONSTRAINT space_courses_space_id_fkey FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: spaces spaces_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.spaces
    ADD CONSTRAINT spaces_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: subscription_payments subscription_payments_subscription_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscription_payments
    ADD CONSTRAINT subscription_payments_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: subscriptions subscriptions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: units units_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: units units_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vocabularies vocabularies_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT vocabularies_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vocabularies vocabularies_space_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT vocabularies_space_id_fkey FOREIGN KEY (space_id) REFERENCES public.spaces(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: neondb_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

