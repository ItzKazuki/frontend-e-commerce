import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextHeader from "../../components/TextHeader";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getAddress from "../../api/address/getAddress";
import { Each } from "../../components/Each";
import Loading from "../../components/Loading";
import { createAddressDetail } from "../../utils";

export default function Addresses() {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAddress().then((data) => {
      setLoading(false);
      setAddress(data.address);
    });
  }, [setAddress]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <TextHeader>My Address</TextHeader>
          <p className="mb-4 ml-4">click address to view</p>
          <div className="flex flex-col justify-center items-center gap-4">
            <Each
              of={address}
              render={(item) => (
                <Link
                  to={`${item.id}`}
                  className="card w-full bg-base-200 shadow-xl"
                >
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.address_title}{" "}
                      {item.is_primary ? (
                        <div className="badge badge-primary">in use</div>
                      ) : (
                        ""
                      )}
                    </h5>
                    <p>{createAddressDetail(item, user)}</p>
                  </div>
                </Link>
              )}
            />
            {address.length < 5 && (
              <Link to="create" className="card w-full bg-base-200 shadow-xl">
                <div className="card-body">
                  <h5 className="card-title justify-center">
                    <FontAwesomeIcon icon={faAdd} />
                  </h5>
                  <p className="text-center font-bold">Add a new Address</p>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
