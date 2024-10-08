PGDMP      &                |            parcel    16.3    16.3 8    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    16398    parcel    DATABASE     �   CREATE DATABASE parcel WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE parcel;
                postgres    false            �            1259    16436    company    TABLE     P   CREATE TABLE public.company (
    com_id integer NOT NULL,
    com_name text
);
    DROP TABLE public.company;
       public         heap    postgres    false            �            1259    16435    company_com_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_com_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.company_com_id_seq;
       public          postgres    false    224            &           0    0    company_com_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.company_com_id_seq OWNED BY public.company.com_id;
          public          postgres    false    223            �            1259    16445 	   delivered    TABLE     �   CREATE TABLE public.delivered (
    del_id integer NOT NULL,
    par_id integer,
    own_id integer,
    deliverydate timestamp(3) without time zone,
    deliver_name text
);
    DROP TABLE public.delivered;
       public         heap    postgres    false            �            1259    16444    delivered_del_id_seq    SEQUENCE     �   CREATE SEQUENCE public.delivered_del_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.delivered_del_id_seq;
       public          postgres    false    226            '           0    0    delivered_del_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.delivered_del_id_seq OWNED BY public.delivered.del_id;
          public          postgres    false    225            �            1259    16409    owner    TABLE     t   CREATE TABLE public.owner (
    own_id integer NOT NULL,
    own_name text NOT NULL,
    own_phone text NOT NULL
);
    DROP TABLE public.owner;
       public         heap    postgres    false            �            1259    16408    owner_own_id_seq    SEQUENCE     �   CREATE SEQUENCE public.owner_own_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.owner_own_id_seq;
       public          postgres    false    218            (           0    0    owner_own_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.owner_own_id_seq OWNED BY public.owner.own_id;
          public          postgres    false    217            �            1259    16427    parcel    TABLE     �   CREATE TABLE public.parcel (
    par_id integer NOT NULL,
    par_real_id text NOT NULL,
    own_id integer,
    staff_id integer,
    pickupsdate timestamp(3) without time zone,
    sta_id integer,
    com_id integer
);
    DROP TABLE public.parcel;
       public         heap    postgres    false            �            1259    16426    parcel_par_id_seq    SEQUENCE     �   CREATE SEQUENCE public.parcel_par_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.parcel_par_id_seq;
       public          postgres    false    222            )           0    0    parcel_par_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.parcel_par_id_seq OWNED BY public.parcel.par_id;
          public          postgres    false    221            �            1259    16400    staff    TABLE     �   CREATE TABLE public.staff (
    id integer NOT NULL,
    staff_name text,
    staff_phone text,
    email text NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.staff;
       public         heap    postgres    false            �            1259    16399    staff_id_seq    SEQUENCE     �   CREATE SEQUENCE public.staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.staff_id_seq;
       public          postgres    false    216            *           0    0    staff_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.staff_id_seq OWNED BY public.staff.id;
          public          postgres    false    215            �            1259    16418    status    TABLE     X   CREATE TABLE public.status (
    sta_id integer NOT NULL,
    sta_name text NOT NULL
);
    DROP TABLE public.status;
       public         heap    postgres    false            �            1259    16417    status_sta_id_seq    SEQUENCE     �   CREATE SEQUENCE public.status_sta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.status_sta_id_seq;
       public          postgres    false    220            +           0    0    status_sta_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.status_sta_id_seq OWNED BY public.status.sta_id;
          public          postgres    false    219            m           2604    16439    company com_id    DEFAULT     p   ALTER TABLE ONLY public.company ALTER COLUMN com_id SET DEFAULT nextval('public.company_com_id_seq'::regclass);
 =   ALTER TABLE public.company ALTER COLUMN com_id DROP DEFAULT;
       public          postgres    false    224    223    224            n           2604    16448    delivered del_id    DEFAULT     t   ALTER TABLE ONLY public.delivered ALTER COLUMN del_id SET DEFAULT nextval('public.delivered_del_id_seq'::regclass);
 ?   ALTER TABLE public.delivered ALTER COLUMN del_id DROP DEFAULT;
       public          postgres    false    225    226    226            j           2604    16412    owner own_id    DEFAULT     l   ALTER TABLE ONLY public.owner ALTER COLUMN own_id SET DEFAULT nextval('public.owner_own_id_seq'::regclass);
 ;   ALTER TABLE public.owner ALTER COLUMN own_id DROP DEFAULT;
       public          postgres    false    218    217    218            l           2604    16430    parcel par_id    DEFAULT     n   ALTER TABLE ONLY public.parcel ALTER COLUMN par_id SET DEFAULT nextval('public.parcel_par_id_seq'::regclass);
 <   ALTER TABLE public.parcel ALTER COLUMN par_id DROP DEFAULT;
       public          postgres    false    221    222    222            i           2604    16403    staff id    DEFAULT     d   ALTER TABLE ONLY public.staff ALTER COLUMN id SET DEFAULT nextval('public.staff_id_seq'::regclass);
 7   ALTER TABLE public.staff ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            k           2604    16421    status sta_id    DEFAULT     n   ALTER TABLE ONLY public.status ALTER COLUMN sta_id SET DEFAULT nextval('public.status_sta_id_seq'::regclass);
 <   ALTER TABLE public.status ALTER COLUMN sta_id DROP DEFAULT;
       public          postgres    false    219    220    220                      0    16436    company 
   TABLE DATA           3   COPY public.company (com_id, com_name) FROM stdin;
    public          postgres    false    224   x=                 0    16445 	   delivered 
   TABLE DATA           W   COPY public.delivered (del_id, par_id, own_id, deliverydate, deliver_name) FROM stdin;
    public          postgres    false    226   �=                 0    16409    owner 
   TABLE DATA           <   COPY public.owner (own_id, own_name, own_phone) FROM stdin;
    public          postgres    false    218   �>                 0    16427    parcel 
   TABLE DATA           d   COPY public.parcel (par_id, par_real_id, own_id, staff_id, pickupsdate, sta_id, com_id) FROM stdin;
    public          postgres    false    222   �?                 0    16400    staff 
   TABLE DATA           M   COPY public.staff (id, staff_name, staff_phone, email, password) FROM stdin;
    public          postgres    false    216   �@                 0    16418    status 
   TABLE DATA           2   COPY public.status (sta_id, sta_name) FROM stdin;
    public          postgres    false    220   [A       ,           0    0    company_com_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.company_com_id_seq', 1, false);
          public          postgres    false    223            -           0    0    delivered_del_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.delivered_del_id_seq', 11, true);
          public          postgres    false    225            .           0    0    owner_own_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.owner_own_id_seq', 17, true);
          public          postgres    false    217            /           0    0    parcel_par_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.parcel_par_id_seq', 20, true);
          public          postgres    false    221            0           0    0    staff_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.staff_id_seq', 2, true);
          public          postgres    false    215            1           0    0    status_sta_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.status_sta_id_seq', 1, false);
          public          postgres    false    219            {           2606    16443    company company_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (com_id);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            postgres    false    224            ~           2606    16452    delivered delivered_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_pkey PRIMARY KEY (del_id);
 B   ALTER TABLE ONLY public.delivered DROP CONSTRAINT delivered_pkey;
       public            postgres    false    226            t           2606    16416    owner owner_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.owner
    ADD CONSTRAINT owner_pkey PRIMARY KEY (own_id);
 :   ALTER TABLE ONLY public.owner DROP CONSTRAINT owner_pkey;
       public            postgres    false    218            x           2606    16434    parcel parcel_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_pkey PRIMARY KEY (par_id);
 <   ALTER TABLE ONLY public.parcel DROP CONSTRAINT parcel_pkey;
       public            postgres    false    222            q           2606    16407    staff staff_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.staff DROP CONSTRAINT staff_pkey;
       public            postgres    false    216            v           2606    16425    status status_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (sta_id);
 <   ALTER TABLE ONLY public.status DROP CONSTRAINT status_pkey;
       public            postgres    false    220            y           1259    16455    company_com_name_key    INDEX     S   CREATE UNIQUE INDEX company_com_name_key ON public.company USING btree (com_name);
 (   DROP INDEX public.company_com_name_key;
       public            postgres    false    224            |           1259    16456    delivered_par_id_key    INDEX     S   CREATE UNIQUE INDEX delivered_par_id_key ON public.delivered USING btree (par_id);
 (   DROP INDEX public.delivered_par_id_key;
       public            postgres    false    226            r           1259    16454    owner_own_phone_key    INDEX     Q   CREATE UNIQUE INDEX owner_own_phone_key ON public.owner USING btree (own_phone);
 '   DROP INDEX public.owner_own_phone_key;
       public            postgres    false    218            o           1259    16453    staff_email_key    INDEX     I   CREATE UNIQUE INDEX staff_email_key ON public.staff USING btree (email);
 #   DROP INDEX public.staff_email_key;
       public            postgres    false    216            �           2606    16482    delivered delivered_own_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.delivered DROP CONSTRAINT delivered_own_id_fkey;
       public          postgres    false    226    4724    218            �           2606    16477    delivered delivered_par_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.delivered
    ADD CONSTRAINT delivered_par_id_fkey FOREIGN KEY (par_id) REFERENCES public.parcel(par_id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.delivered DROP CONSTRAINT delivered_par_id_fkey;
       public          postgres    false    222    226    4728                       2606    16457    parcel parcel_com_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_com_id_fkey FOREIGN KEY (com_id) REFERENCES public.company(com_id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.parcel DROP CONSTRAINT parcel_com_id_fkey;
       public          postgres    false    222    224    4731            �           2606    16462    parcel parcel_own_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_own_id_fkey FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.parcel DROP CONSTRAINT parcel_own_id_fkey;
       public          postgres    false    4724    218    222            �           2606    16472    parcel parcel_sta_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_sta_id_fkey FOREIGN KEY (sta_id) REFERENCES public.status(sta_id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.parcel DROP CONSTRAINT parcel_sta_id_fkey;
       public          postgres    false    4726    220    222            �           2606    16467    parcel parcel_staff_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.parcel
    ADD CONSTRAINT parcel_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.parcel DROP CONSTRAINT parcel_staff_id_fkey;
       public          postgres    false    4721    216    222                  x�3��v
��2�t�q������� 2S-           x���;JA��S����+7t��=��
��D�#���e����Q�`�Y��������ډͺ�QƭT\;�T�-�Ko�D�'|���	GVknG�lb��R)�?Jͽ�����5�8�8%w:X����s���}�/��?��9�?�R�<6����\�B'�Ñmՠ�BqI���;ǁ[�W�'_�����б���(��s�Z������΋��5�HKK]N(��肠��k>�֢���5���Y�yZv	 �p3:         �   x�U�M
�@�דS�2������
"���.Tpau��&G1��ӐE���^�S�aG��{Y2��IX�t%�����U���b �Gt#\'6LX�>wo�B���XZg<�0br��O����'��ۯd@�Y����\�)j0���Ҝ�eK�o��Í�y��F_���'% Ǭ	7r�C8�S0� �I׫�         �   x�u�9n1Ek���~R��61�ʕ�p���������!T��q��A���������ЇbX��� Zl��d]2	���C�8��������p6�*}=c�F����.t�J�쀋��s�G<�c�:�q�����T_�F�wSo%Z�~%�FP>��!-#YnS���C!�^�X_��T��7��x�цZ�q��K�����EOyq�(6��c�٢o�z��eq��I��R�Bqk�         �   x�3�|�cރ[��x�����&{Ǣ;�pX����r�;��&f��%��r�%����$E�Z���&%;�e���;�{�G�8'�8eW�{���eXX&��qqz;�;zrX��Y�YXZsfc�Z�j�i�nf��j���R��W����T���l�n����\n�S�������� ��F�         >   x�3�|�cу�h������vv�S��|�c1Xj�'��`g�K��˹b���� z*�     