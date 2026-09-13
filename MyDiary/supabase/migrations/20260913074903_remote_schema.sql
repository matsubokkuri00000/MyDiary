SET local check_function_bodies = off;

CREATE TABLE "public"."diaries" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "title"      text                     NOT NULL DEFAULT ''''''::text,
  "main_text"  text                     NOT NULL DEFAULT ''''''::text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
  "user_id"    uuid,
  CONSTRAINT "diaries_main_text_length_check" CHECK ((char_length(main_text) <= 10000)),
  CONSTRAINT "diaries_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."diaries"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."todos" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "task"         text                     NOT NULL,
  "is_completed" boolean                  NOT NULL DEFAULT false,
  "created_at"   timestamp with time zone NOT NULL DEFAULT now(),
  "update_at"    timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "todos_pkey" PRIMARY KEY (id),
  CONSTRAINT "todos_task_length_check" CHECK ((char_length(task) <= 200)),
  "user_id"      uuid                     NOT NULL DEFAULT auth.uid()
);

ALTER TABLE "public"."todos"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.check_diary_post_interval()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
    if exists (
        select 1
        from public.diaries
        where user_id = new.user_id
          and created_at > now() - interval '3 seconds'
    ) then
        raise exception 'Diary posts must be at least 3 seconds apart';
    end if;

    return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.check_todo_post_interval()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
    if exists (
        select 1
        from public.todos
        where user_id = new.user_id
          and created_at > now() - interval '1 second'
    ) then
        raise exception 'Todo posts must be at least 1 second apart';
    end if;

    return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.delete_my_data()
  RETURNS void
  LANGUAGE plpgsql
  AS $function$
begin
    if auth.uid() is null then
        raise exception 'Not authenticated';
    end if;

    delete from public.diaries
    where user_id = auth.uid();

    delete from public.todos
    where user_id = auth.uid();
end;
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

ALTER TABLE "public"."diaries"
  ADD CONSTRAINT "diaries_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE TRIGGER check_diary_post_interval_trigger
  BEFORE INSERT ON public.diaries
  FOR EACH ROW
  EXECUTE FUNCTION public.check_diary_post_interval();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.diaries
  FOR EACH ROW
  EXECUTE FUNCTION public.updated_at();

CREATE TRIGGER check_todo_post_interval_trigger
  BEFORE INSERT ON public.todos
  FOR EACH ROW
  EXECUTE FUNCTION public.check_todo_post_interval();

CREATE POLICY "deleteDiary" ON "public"."diaries"
  FOR DELETE
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "insertDiary" ON "public"."diaries"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "selectDiary" ON "public"."diaries"
  FOR SELECT
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "updateDiary" ON "public"."diaries"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

GRANT EXECUTE ON FUNCTION "public"."check_diary_post_interval"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."check_todo_post_interval"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."delete_my_data"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."update_updated_at"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."updated_at"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."diaries" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."todos" TO "anon", "authenticated", "postgres", "service_role";

ALTER TABLE "public"."todos"
  ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE POLICY "deleteTodo" ON "public"."todos"
  FOR DELETE
  TO "authenticated"
  USING ((user_id = auth.uid()));

CREATE POLICY "insertTodo" ON "public"."todos"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((user_id = auth.uid()));

CREATE POLICY "selectTodo" ON "public"."todos"
  FOR SELECT
  TO "authenticated"
  USING ((user_id = auth.uid()));

CREATE POLICY "updateTodo" ON "public"."todos"
  FOR UPDATE
  TO "authenticated"
  USING ((user_id = auth.uid()))
  WITH CHECK ((user_id = auth.uid()));

