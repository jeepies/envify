import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";

import * as schemas from "~/services/auth/schemas/form.server";
import * as users from "~/services/models/user.server";

const formStrategy = new FormStrategy(async ({ form, request }) => {
  const type = form.get("type");
  const payload = Object.fromEntries(form);
  delete payload.type;

  const returnable = {
    data: {},
    form: [],
    field: {},
    hasErrored: false,
  };

  if ((type as string).toLowerCase() === "register")
    registerHandler(payload, request, returnable);
});

async function registerHandler(
  form: { [k: string]: FormDataEntryValue },
  request: Request,
  returnable: {
    data: { [k: string]: string | object };
    form: string[];
    field: { [k: string]: string[] | undefined };
  },
) {
  const payload = schemas.registerSchema.safeParse(form);

  if (!payload.success && payload.error) {
    const error = payload.error.flatten();
    returnable.form = error.formErrors;
    returnable.field = error.fieldErrors;
    return;
  }

  const { email, password } = payload.data;

  const isEmailTaken = await users.isEmailTaken(email);
  if (isEmailTaken) {
    returnable.field.email = ["This email already exists"];
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    email: email,
    password: hashedPassword,
  };

  returnable.data.user = await users.createUser(user);
  return;
}
