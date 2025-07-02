import { defineNuxtPlugin } from "#app";
import { marked } from "marked";

export default defineNuxtPlugin(() => ({
  provide: {
    marked,
  },
}));
