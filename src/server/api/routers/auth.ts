import { z } from "zod";
import { supabaseAdminClient } from "~/lib/supabase/client";
import { passwordSchema } from "~/schemas/auth";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

function generateUsername(name: string): string {
  // Logic to generate a username
  return name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 1000);
}

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email().toLowerCase(),
        password: passwordSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { email, password } = input;

      await db.$transaction(async (tx) => {
        let userId = "";

        try {
          const { data, error } =
            await supabaseAdminClient.auth.admin.createUser({
              email,
              password,
            });

          if (error) throw error;

          if (!data?.user) {
            throw new Error('User creation failed');
          }

          userId = data.user.id;

          const generatedUsername = generateUsername(email);

          await tx.profile.create({
            data: {
              email: email,
              userId: userId,
              username: generatedUsername,
            },
          });
        } catch (error) {
          console.log(error);
          if (userId) {
            await supabaseAdminClient.auth.admin.deleteUser(userId);
          }
        }
      });
    }),
});