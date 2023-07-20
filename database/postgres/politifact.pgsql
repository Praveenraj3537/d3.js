--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)

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
-- Name: politifact; Type: TABLE; Schema: public; Owner: asyin
--

CREATE TABLE public.politifact (
    speaker character varying(50) NOT NULL,
    ruling character varying(25) NOT NULL,
    count integer NOT NULL
);


ALTER TABLE public.politifact OWNER TO asyin;

--
-- Data for Name: politifact; Type: TABLE DATA; Schema: public; Owner: asyin
--

COPY public.politifact (speaker, ruling, count) FROM stdin;
Donald Trump	pants-fire	20
Donald Trump	half-true	15
Donald Trump	barely-true	27
Donald Trump	false	55
Donald Trump	mostly-true	7
Donald Trump	true	5
Bernie Sanders	mostly-true	13
Bernie Sanders	half-true	15
Bernie Sanders	barely-true	4
Bernie Sanders	true	5
Bernie Sanders	false	3
Joe Biden	mostly-true	9
Joe Biden	true	4
Joe Biden	pants-fire	1
Joe Biden	barely-true	12
Joe Biden	false	5
Joe Biden	half-true	5
Elizabeth Warren	false	2
Elizabeth Warren	barely-true	4
Elizabeth Warren	mostly-true	7
Elizabeth Warren	true	7
Elizabeth Warren	half-true	7
Kamala Harris	barely-true	4
Kamala Harris	false	5
Kamala Harris	mostly-true	5
Kamala Harris	half-true	2
Kamala Harris	full-flop	1
Pete Buttigieg	barely-true	5
Pete Buttigieg	half-true	4
Pete Buttigieg	true	3
Pete Buttigieg	false	1
Pete Buttigieg	mostly-true	2
Amy Klobuchar	barely-true	1
Amy Klobuchar	true	4
Amy Klobuchar	half-true	3
Amy Klobuchar	mostly-true	4
Amy Klobuchar	false	1
Beto O'Rourke	false	1
Beto O'Rourke	true	3
Beto O'Rourke	barely-true	3
Beto O'Rourke	mostly-true	4
Beto O'Rourke	half-true	2
Michael Bloomberg	half-true	3
Michael Bloomberg	true	3
Michael Bloomberg	mostly-true	4
Michael Bloomberg	barely-true	1
Michael Bloomberg	false	1
Amy Klobuchar	pants-fire	0
Michael Bloomberg	pants-fire	0
Bernie Sanders	pants-fire	0
Elizabeth Warren	pants-fire	0
	pants-fire	0
\.


--
-- Name: politifact politifact_pkey; Type: CONSTRAINT; Schema: public; Owner: asyin
--

ALTER TABLE ONLY public.politifact
    ADD CONSTRAINT politifact_pkey PRIMARY KEY (speaker, ruling);


--
-- PostgreSQL database dump complete
--

