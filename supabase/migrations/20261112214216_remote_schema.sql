ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" REVOKE ALL ON TABLES FROM "service_role";

DROP POLICY IF EXISTS "Enable access for all anon users" ON "public"."albums";

DROP POLICY IF EXISTS "Enable access for all anon users" ON "public"."genre";

DROP POLICY IF EXISTS "anon_users_all" ON "public"."site_settings";

DROP POLICY IF EXISTS "anon_users_all" ON "public"."subscriptions";

REVOKE ALL ON TABLE "public"."albums" FROM "postgres";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."albums" TO "postgres";

REVOKE ALL ON TABLE "public"."albums" FROM "service_role";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."albums" TO "service_role";

REVOKE ALL ON TABLE "public"."genre" FROM "postgres";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."genre" TO "postgres";

REVOKE ALL ON TABLE "public"."genre" FROM "service_role";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."genre" TO "service_role";

REVOKE ALL ON TABLE "public"."queue" FROM "postgres";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."queue" TO "postgres";

REVOKE ALL ON TABLE "public"."queue" FROM "service_role";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."queue" TO "service_role";

REVOKE ALL ON TABLE "public"."site_settings" FROM "postgres";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."site_settings" TO "postgres";

REVOKE ALL ON TABLE "public"."site_settings" FROM "service_role";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."site_settings" TO "service_role";

REVOKE ALL ON TABLE "public"."subscriptions" FROM "postgres";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."subscriptions" TO "postgres";

REVOKE ALL ON TABLE "public"."subscriptions" FROM "service_role";

GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."subscriptions" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT DELETE, INSERT, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLES TO "service_role";

