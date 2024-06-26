import { Link } from "react-router-dom";
import { rupiah } from "../utils";

export default function Product({ productDetail }) {
  return (
    <Link to={`/products/${productDetail.id}`}>
      <div className="card card-compact w-[12rem] bg-base-100 shadow-xl !rounded-btn">
        <figure>
          <img src={`${productDetail.upload.image}`} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h1 className="line-clamp-2 text-white">
            {productDetail.product_name}
          </h1>
          <p className="text-[16px] font-bold text-white">
            {rupiah(productDetail.price)}
          </p>
          <p className="font-semibold">{productDetail.brand}</p>
          <p className="">Tersisa {productDetail.stock}</p>
        </div>
      </div>
    </Link>
  );
}
