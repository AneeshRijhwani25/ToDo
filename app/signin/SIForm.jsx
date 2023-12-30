"use client";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
const SIForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState("");
    
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/profile";
    
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        setFormValues({ email: "", password: "" });
    
        const res = await signIn("credentials", {
          redirect: false,
          email: formValues.email,
          password: formValues.password,
          callbackUrl,
        });
    
        setLoading(false);
    
        console.log(res);
        if (!res?.error) {
          router.push(callbackUrl);
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
    
  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={onSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg capitalize font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
};

export default SIForm;
