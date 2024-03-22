export interface AddCollectionFormFields {
  name: string;
  topic: "Books" | "Signs" | "Silverware";
  description: string;
  image: FileList | null;
}
