import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
export default {
  fetch: withSupabase({
    auth: "user"
  }, async (_req, ctx)=>{
    const userId = ctx.userClaims?.id;
    if (!userId) {
      return Response.json({
        error: "ユーザーを確認できませんでした"
      }, {
        status: 401
      });
    }
    const { error } = await ctx.supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) {
      return Response.json({
        error: error.message
      }, {
        status: 400
      });
    }
    return Response.json({
      message: "アカウントを削除しました"
    });
  })
};
