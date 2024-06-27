import { useState } from "react";
import Card from "../components/Card";
import TextHeader from "../components/TextHeader";
import updateAccount from "../api/updateAccount";
import { useNavigate } from "react-router-dom";

export default function EditAccount() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formUpdate, setFormUpdate] = useState(user);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormUpdate({
      ...formUpdate,
      [e.target.name]: e.target.value,
    });

  const handleSumbit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateAccount(formUpdate).then(res => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(res.user));
      return navigate("/account");
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  return (
    <div>
      <TextHeader>Edit Account</TextHeader>
      <h2 className="text-sm font-bold ml-4">ID: {user.id}</h2>
      <Card title={"Account Details"} className={`w-full mt-2`}>
        <form onSubmit={handleSumbit}>
          <div className={`form-control w-full`}>
            <label className="label">
              <span className={"label-text text-base-content "}>Name</span>
            </label>
            <input
              name="name"
              type={"text"}
              placeholder={""}
              className="input input-bordered w-full"
              onChange={handleChange}
              value={formUpdate.name}
              required
            />
          </div>
          <div className={`form-control w-full`}>
            <label className="label">
              <span className={"label-text text-base-content "}>about</span>
            </label>
            <textarea
              rows="4"
              name="about"
              type={"text"}
              className="block p-2.5 w-full text-lg rounded-lg border input-bordered"
              onChange={handleChange}
              value={formUpdate.about}
              required
            >{formUpdate.about}</textarea>
          </div>
          <div className={`form-control w-full`}>
            <label className="label">
              <span className={"label-text text-base-content "}>Email</span>
            </label>
            <input
              name="email"
              type={"email"}
              placeholder={""}
              className="input input-bordered w-full"
              onChange={handleChange}
              value={formUpdate.email}
              required
            />
          </div>
          <div className={`form-control w-full`}>
            <label className="label">
              <span className={"label-text text-base-content "}>
                Phone Number
              </span>
            </label>
            <input
              name="phone"
              type={"text"}
              placeholder={""}
              className="input input-bordered w-full"
              onChange={handleChange}
              value={formUpdate.phone}
              required
            />
          </div>
          <button type="submit" className={`btn mt-6 w-full btn-primary`}>
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Update Account"
            )}
          </button>
        </form>
      </Card>
    </div>
  );
}
