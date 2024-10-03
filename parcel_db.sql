--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-20 20:20:44

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 33204)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 33252)
-- Name: delivered; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivered (
    del_id integer NOT NULL,
    par_id integer,
    own_id integer,
    deliverydate timestamp(3) without time zone,
    deliver_name text
);


ALTER TABLE public.delivered OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 33251)
-- Name: delivered_del_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.delivered_del_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.delivered_del_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 224
-- Name: delivered_del_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.delivered_del_id_seq OWNED BY public.delivered.del_id;


--
-- TOC entry 219 (class 1259 OID 33225)
-- Name: owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.owner (
    own_id integer NOT NULL,
    own_name text NOT NULL,
    own_phone text
);


ALTER TABLE public.owner OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 33224)
-- Name: owner_own_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.owner_own_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.owner_own_id_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 218
-- Name: owner_own_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.owner_own_id_seq OWNED BY public.owner.own_id;


--
-- TOC entry 223 (class 1259 OID 33243)
-- Name: parcel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parcel (
    par_id integer NOT NULL,
    par_real_id text NOT NULL,
    own_id integer,
    staff_id integer,
    pickupsdate timestamp(3) without time zone,
    sta_id integer
);


ALTER TABLE public.parcel OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 33242)
-- Name: parcel_par_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parcel_par_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parcel_par_id_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 222
-- Name: parcel_par_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parcel_par_id_seq OWNED BY public.parcel.par_id;


--
-- TOC entry 217 (class 1259 OID 33216)
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    staff_name text NOT NULL,
    staff_phone text
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 33215)
-- Name: staff_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staff_staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.staff_staff_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 216
-- Name: staff_staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staff_staff_id_seq OWNED BY public.staff.staff_id;


--
-- TOC entry 221 (class 1259 OID 33234)
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    sta_id integer NOT NULL,
    sta_name text NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33233)
-- Name: status_sta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_sta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.status_sta_id_seq OWNER TO postgres;

--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 220
-- Name: status_sta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_sta_id_seq OWNED BY public.status.sta_id;


--
-- TOC entry 4718 (class 2604 OID 33255)
-- Name: delivered del_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivered ALTER COLUMN del_id SET DEFAULT nextval('public.delivered_del_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 33228)
-- Name: owner own_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner ALTER COLUMN own_id SET DEFAULT nextval('public.owner_own_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 33246)
-- Name: parcel par_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcel ALTER COLUMN par_id SET DEFAULT nextval('public.parcel_par_id_seq'::regclass);


--
-- TOC entry 4714 (class 2604 OID 33219)
-- Name: staff staff_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff ALTER COLUMN staff_id SET DEFAULT nextval('public.staff_staff_id_seq'::regclass);


--
-- TOC entry 4716 (class 2604 OID 33237)
-- Name: status sta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN sta_id SET DEFAULT nextval('public.status_sta_id_seq'::regclass);


--
-- TOC entry 4880 (class 0 OID 33204)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
4861578c-428b-45d2-be37-765cc3b5fcdf	57d304f539be38d397bc38af25336ca9c9440af57933725d8a6fcaece79ab9f5	2024-06-20 20:05:51.300401+07	20240620130551_init	\N	\N	2024-06-20 20:05:51.137734+07	1
\.


--
-- TOC entry 4890 (class 0 OID 33252)
-- Dependencies: 225
-- Data for Name: delivered; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivered (del_id, par_id, own_id, deliverydate, deliver_name) FROM stdin;
\.


--
-- TOC entry 4884 (class 0 OID 33225)
-- Dependencies: 219
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.owner (own_id, own_name, own_phone) FROM stdin;
\.


--
-- TOC entry 4888 (class 0 OID 33243)
-- Dependencies: 223
-- Data for Name: parcel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parcel (par_id, par_real_id, own_id, staff_id, pickupsdate, sta_id) FROM stdin;
\.


--
-- TOC entry 4882 (class 0 OID 33216)
-- Dependencies: 217
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff (staff_id, staff_name, staff_phone) FROM stdin;
\.


--
-- TOC entry 4886 (class 0 OID 33234)
-- Dependencies: 221
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (sta_id, sta_name) FROM stdin;
\.


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 224
-- Name: delivered_del_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delivered_del_id_seq', 1, false);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 218
-- Name: owner_own_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.owner_own_id_seq', 1, false);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 222
-- Name: parcel_par_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parcel_par_id_seq', 1, false);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 216
-- Name: staff_staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_staff_id_seq', 1, false);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 220
-- Name: status_sta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_sta_id_seq', 1, false);


--
-- TOC entry 4720 (class 2606 OID 33212)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 33259)
-- Name: delivered delivered_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_pkey PRIMARY KEY (del_id);


--
-- TOC entry 4724 (class 2606 OID 33232)
-- Name: owner owner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT owner_pkey PRIMARY KEY (own_id);


--
-- TOC entry 4728 (class 2606 OID 33250)
-- Name: parcel parcel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_pkey PRIMARY KEY (par_id);


--
-- TOC entry 4722 (class 2606 OID 33223)
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 4726 (class 2606 OID 33241)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (sta_id);


--
-- TOC entry 4729 (class 1259 OID 33260)
-- Name: delivered_par_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX delivered_par_id_key ON public.delivered USING btree (par_id);


--
-- TOC entry 4735 (class 2606 OID 33281)
-- Name: delivered delivered_own_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4736 (class 2606 OID 33276)
-- Name: delivered delivered_par_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_par_id_fkey FOREIGN KEY (par_id) REFERENCES public.parcel(par_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4732 (class 2606 OID 33261)
-- Name: parcel parcel_own_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4733 (class 2606 OID 33271)
-- Name: parcel parcel_sta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_sta_id_fkey FOREIGN KEY (sta_id) REFERENCES public.status(sta_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4734 (class 2606 OID 33266)
-- Name: parcel parcel_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(staff_id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2024-06-20 20:20:45

--
-- PostgreSQL database dump complete
--

