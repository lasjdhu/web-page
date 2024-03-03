import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Contact() {
  const { t } = useTranslation();

  const form = useRef();
  const [fake_field, setFakeField] = useState("");
  const [fake_email, setFakeEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const maxMessageLength = 500;

  function handleTextareaChange(e) {
    const input = e.target.value;
    setMessage(input.slice(0, maxMessageLength));
  }

  function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (fake_field === "" && fake_email === "") {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then(
          // eslint-disable-next-line no-unused-vars
          (response) => {
            setIsLoading(false);
            setIsSuccess(true);
            setShowModal(true);
            setMessage("");
            form.current.reset();
          },
          // eslint-disable-next-line no-unused-vars
          (error) => {
            setIsLoading(false);
            setIsSuccess(false);
            setShowModal(true);
          }
        );
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex items-center justify-center m-auto mx-6">
      <form
        className="flex flex-col w-full max-w-3xl lg:flex-row"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="lg:w-1/2 lg:pr-4">
          <div>
            <label
              htmlFor="jkasdhasl"
              className="block mb-2 text-sm font-medium text-left text-white"
            >
              {t("name")}
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              id="jkasdhasl"
              autoComplete="off"
              className="shadow-sm border border-gray-500 text-sm block w-full p-2.5 bg-background"
              placeholder={t("placeholder_name")}
              name="from_name"
              maxLength="30"
              required
            />
          </div>
          <div>
            <label
              htmlFor="kjksadhn"
              className="block mt-4 mb-2 text-sm font-medium text-left text-white"
            >
              {t("email")}
              <span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              id="kjksadhn"
              autoComplete="off"
              className="shadow-sm border border-gray-500 text-sm block w-full p-2.5 bg-background"
              placeholder={t("placeholder_email")}
              name="from_email"
              maxLength="30"
              required
            />
          </div>
          <div>
            <label
              htmlFor="kljasdlk"
              className="block mt-4 mb-2 text-sm font-medium text-left text-white"
            >
              {t("subject")}
            </label>
            <input
              type="text"
              id="kljasdlk"
              autoComplete="off"
              className="block w-full p-3 text-sm border border-gray-500 shadow-sm bg-background"
              maxLength="30"
              name="subject"
            />
          </div>
        </div>
        <div className="mt-4 lg:w-1/2 lg:pl-4 lg:mt-0">
          <div className="flex flex-col h-full">
            <label
              htmlFor="jasdajk"
              className="block mb-2 text-sm font-medium text-left text-white"
            >
              {t("message")}
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              rows="5"
              id="jasdajk"
              autoComplete="off"
              className="flex-1 p-2.5 w-full text-sm shadow-sm border border-gray-500 bg-background"
              placeholder={t("placeholder_message")}
              maxLength={maxMessageLength}
              name="message"
              value={message}
              onChange={handleTextareaChange}
              required
            />
            <div className="flex justify-end mt-1 text-sm text-gray-500">
              {message.length}/{maxMessageLength} {t("characters_remaining")}
            </div>
            <button
              type="submit"
              className={`mt-5 flex h-12 justify-center items-center px-3 text-sm border cursor-pointer ${
                isLoading
                  ? "bg-accent text-background border-accent"
                  : "bg-transparent text-accent hover:bg-accent hover:text-background border-accent"
              }`}
            >
              {isLoading ? <ScaleLoader /> : t("send_message")}
            </button>
          </div>
        </div>
        <label className="ohnohoney" htmlFor="name"></label>
        <input
          className="ohnohoney"
          autoComplete="off"
          type="text"
          id="name"
          name="name"
          placeholder="Your name here"
          value={fake_field}
          onChange={(e) => setFakeField(e.target.value)}
        />
        <label className="ohnohoney" htmlFor="email"></label>
        <input
          className="ohnohoney"
          autoComplete="off"
          type="email"
          id="email"
          name="email"
          placeholder="Your e-mail here"
          value={fake_email}
          onChange={(e) => setFakeEmail(e.target.value)}
        />
      </form>
      {showModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background bg-opacity-80">
          <p className="mb-2 text-lg font-semibold">
            {isSuccess ? t("mail_success") : t("mail_failure")}
          </p>
          <button
            className="flex items-center justify-center w-16 h-12 px-3 mt-5 text-sm bg-transparent border cursor-pointer hover:bg-accent text-accent hover:text-background border-accent"
            onClick={closeModal}
          >
            {t("OK")}
          </button>
        </div>
      )}
    </main>
  );
}
