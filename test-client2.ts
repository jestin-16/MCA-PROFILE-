import { anyApi } from "convex/server";
import { getFunctionName } from "convex/server";
console.log(getFunctionName(anyApi.students.get));
