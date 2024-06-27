import { useState } from "react";
import TextHeader from "../../components/TextHeader";
import createAddress from "../../api/address/createAddress";
import { useNavigate } from "react-router-dom";

export default function CreateAddress() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address_title: "",
    address_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    createAddress(address)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/account/address");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <TextHeader>Create Address</TextHeader>
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address Title</span>
              </label>
              <input
                type="text"
                placeholder="Home"
                name="address_title"
                className="input input-bordered"
                value={address.address_title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address Name</span>
              </label>
              <input
                type="text"
                placeholder="Home"
                name="address_name"
                className="input input-bordered"
                value={address.address_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address 1</span>
              </label>
              <input
                type="text"
                placeholder="jln. abd no 55"
                name="address_line1"
                className="input input-bordered"
                value={address.address_line1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address 2</span>
              </label>
              <input
                type="text"
                placeholder="gg limau 56"
                name="address_line2"
                className="input input-bordered"
                value={address.address_line2}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                placeholder="Jakarta Timur"
                name="city"
                className="input input-bordered"
                value={address.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                placeholder="DKI Jakarta"
                name="state"
                className="input input-bordered"
                value={address.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input
                type="number"
                placeholder="123456"
                name="postal_code"
                className="input input-bordered"
                value={address.postal_code}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                placeholder="Indonesia"
                name="country"
                className="input input-bordered"
                value={address.country}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <button className="btn btn-primary mt-4">
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Create Address"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
