const password = "hejHej";
const hashedPassword = await Bun.password.hash(password, "argon2d");
console.log(hashedPassword);

export {};
