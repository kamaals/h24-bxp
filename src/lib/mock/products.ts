import { ProductWithCategoryAndAttributeResponseType } from "@/lib/types/product";

export const MOCK_PRODUCTS: {
  total: number;
  products: Array<ProductWithCategoryAndAttributeResponseType>;
} = {
  products: [
    {
      id: "5a471e4a-4c9d-4708-9313-74d7afbd1d0b",
      name: "Noval",
      categoryId: "92970cc2-5286-4832-a938-c360b93a7983",
      price: 27188,
      photo: ["https://picsum.photos/id/63/400/300"],
      description:
        "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
      category: {
        name: "One",
        id: "92970cc2-5286-4832-a938-c360b93a7983",
      },
      attributes: [
        {
          name: "Def",
          type: "text",
          code: "PP",
          id: "3242822b-7506-41af-a39b-2d3450383f8c",
        },
      ],
      lastUpdated: true,
    },
    {
      id: "75e33945-4790-4534-acf9-752bcba2128a",
      name: "Nill",
      categoryId: "92970cc2-5286-4832-a938-c360b93a7983",
      price: 48432,
      photo: ["https://picsum.photos/id/87/400/300"],
      description:
        "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
      category: {
        name: "One",
        id: "92970cc2-5286-4832-a938-c360b93a7983",
      },
      attributes: [],
    },
    {
      id: "b472a040-abcf-48ec-a001-336df279e6e0",
      name: "Planatarium",
      categoryId: "92970cc2-5286-4832-a938-c360b93a7983",
      price: 3746,
      photo: ["https://picsum.photos/id/153/400/300"],
      description:
        "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
      category: {
        name: "One",
        id: "92970cc2-5286-4832-a938-c360b93a7983",
      },
      attributes: [],
    },
    {
      id: "0abd6bbf-46e5-489a-a392-d03e4159c2bb",
      name: "Prada",
      categoryId: "92970cc2-5286-4832-a938-c360b93a7983",
      price: 24740,
      photo: ["https://picsum.photos/id/155/400/300"],
      description:
        "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
      category: {
        name: "One",
        id: "92970cc2-5286-4832-a938-c360b93a7983",
      },
      attributes: [],
    },
    {
      id: "28fa70c3-26cd-40e9-a0a9-7d9cefca0068",
      name: "Slam",
      categoryId: "92970cc2-5286-4832-a938-c360b93a7983",
      price: 36129,
      photo: ["https://picsum.photos/id/112/400/300"],
      description:
        "Nunc eget diam lacinia, fringilla justo sit amet, sodales nisl. Mauris nec tincidunt eros, vitae pulvinar ligula.",
      category: {
        name: "One",
        id: "92970cc2-5286-4832-a938-c360b93a7983",
      },
      attributes: [],
    },
  ],
  total: 11,
};
