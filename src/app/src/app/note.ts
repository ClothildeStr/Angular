import { Tag } from "./tag"

export type Note = {
  'id':number,
  'tag':Tag | null,
  'contenu':string,
}