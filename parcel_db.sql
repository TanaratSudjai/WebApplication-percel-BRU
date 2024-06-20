--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3

-- Started on 2024-06-20 12:47:10 UTC

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
-- TOC entry 219 (class 1259 OID 16424)
-- Name: delivered; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.delivered (
    del_id integer NOT NULL,
    par_id integer,
    own_id integer,
    deliverydate date,
    deliver_name text
);


ALTER TABLE public.delivered OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 16394)
-- Name: owner; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.owner (
    own_id integer NOT NULL,
    own_name character varying(255) NOT NULL,
    own_phone character varying(20)
);


ALTER TABLE public.owner OWNER TO admin;

--
-- TOC entry 218 (class 1259 OID 16404)
-- Name: parcel; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.parcel (
    par_id integer NOT NULL,
    par_real_id character varying(255) NOT NULL,
    own_id integer,
    staff_id integer,
    pickupsdate date,
    sta_id integer
);


ALTER TABLE public.parcel OWNER TO admin;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: staff; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    staff_name character varying(255) NOT NULL,
    staff_phone character varying(20)
);


ALTER TABLE public.staff OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.status (
    sta_id integer NOT NULL,
    sta_name character varying(50) NOT NULL
);


ALTER TABLE public.status OWNER TO admin;

--
-- TOC entry 3380 (class 0 OID 16424)
-- Dependencies: 219
-- Data for Name: delivered; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.delivered (del_id, par_id, own_id, deliverydate, deliver_name) FROM stdin;
\.


--
-- TOC entry 3377 (class 0 OID 16394)
-- Dependencies: 216
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.owner (own_id, own_name, own_phone) FROM stdin;
\.


--
-- TOC entry 3379 (class 0 OID 16404)
-- Dependencies: 218
-- Data for Name: parcel; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.parcel (par_id, par_real_id, own_id, staff_id, pickupsdate, sta_id) FROM stdin;
\.


--
-- TOC entry 3376 (class 0 OID 16389)
-- Dependencies: 215
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.staff (staff_id, staff_name, staff_phone) FROM stdin;
\.


--
-- TOC entry 3378 (class 0 OID 16399)
-- Dependencies: 217
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.status (sta_id, sta_name) FROM stdin;
\.


--
-- TOC entry 3227 (class 2606 OID 16430)
-- Name: delivered delivered_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_pkey PRIMARY KEY (del_id);


--
-- TOC entry 3221 (class 2606 OID 16398)
-- Name: owner owner_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT owner_pkey PRIMARY KEY (own_id);


--
-- TOC entry 3225 (class 2606 OID 16408)
-- Name: parcel parcel_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_pkey PRIMARY KEY (par_id);


--
-- TOC entry 3219 (class 2606 OID 16393)
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 3223 (class 2606 OID 16403)
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (sta_id);


--
-- TOC entry 3231 (class 2606 OID 16436)
-- Name: delivered delivered_own_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id);


--
-- TOC entry 3232 (class 2606 OID 16431)
-- Name: delivered delivered_par_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_par_id_fkey FOREIGN KEY (par_id) REFERENCES public.parcel(par_id);


--
-- TOC entry 3228 (class 2606 OID 16409)
-- Name: parcel parcel_own_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id);


--
-- TOC entry 3229 (class 2606 OID 16419)
-- Name: parcel parcel_sta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_sta_id_fkey FOREIGN KEY (sta_id) REFERENCES public.status(sta_id);


--
-- TOC entry 3230 (class 2606 OID 16414)
-- Name: parcel parcel_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(staff_id);


-- Completed on 2024-06-20 12:47:10 UTC

--
-- PostgreSQL database dump complete
--

