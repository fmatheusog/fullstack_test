import { FunctionComponent } from "react";
import { Product } from "@/interfaces/product.interface";
import Image from "next/image";

export const ProductCard: FunctionComponent<Product> = (props: Product) => {
  const { name, price, image, source, url } = props;

  return (
    <li className="list-none bg-gray-300 p-4 rounded-md shadow-md">
      <div className="flex justify-start">
        <div className="mr-4 flex">
            <Image src={image} alt="product image" width={100} height={100} />
        </div>

        <div>
          <div className="font-bold">{name}</div>
          <div>{price}</div>
          <div>Fonte: {source}</div>
          <div>
            <a className="text-sky-800" href={url}>Link para o produto</a>
          </div>
        </div>
      </div>
    </li>
  );
};
