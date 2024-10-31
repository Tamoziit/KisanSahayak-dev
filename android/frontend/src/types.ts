import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainContainer: undefined;
  Sell: undefined;
  MyListings: undefined;
  ProductDetails: { productId: string };
};

export type Product = {
    _id: string;
    product_name: string;
    seller_name: string;
    seller_type: string;
    updatedAt: string;
    price: number;
    image_url: string;
  };
