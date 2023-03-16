import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.ENC_STR as string);

export default cryptr;
