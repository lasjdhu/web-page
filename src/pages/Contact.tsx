/*
 * https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/
 *
 */

import { useState, useRef, createRef } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Contact() {
  const { t } = useTranslation();

  const refCaptcha = createRef<ReCAPTCHA>();
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const maxMessageLength = 500;

  function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setIsValid(form.current?.checkValidity());
    const input = event.target.value;
    setMessage(input.slice(0, maxMessageLength));
  }

  function sendEmail(token: string) {
    const params = {
      from_name: form.current?.from_name.value,
      from_email: form.current?.from_email.value,
      subject: form.current?.subject.value,
      message_html: form.current?.message.value,
      "g-recaptcha-response": token,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (_response) => {
          setIsLoading(false);
          setIsSuccess(true);
          setShowModal(true);
          setMessage("");
          setIsValid(false);
          form.current?.reset();
          refCaptcha.current?.reset();
        },
        (_error) => {
          setIsLoading(false);
          setIsSuccess(false);
          setShowModal(true);
        },
      )
      .catch((_error) => {
        setIsLoading(false);
        setIsSuccess(false);
        setShowModal(true);
      });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const token = await refCaptcha.current?.executeAsync();
    if (!token) {
      setIsLoading(false);
      setIsSuccess(false);
      setErrorMessage(t("captcha_error"));
      setShowModal(true);
      return;
    } else {
      sendEmail(token);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex items-center justify-center mx-6 my-12 lg:my-auto md:my-auto">
      <form
        className="flex flex-col w-full max-w-3xl lg:w-1/2"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:pr-4 lg:w-1/2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-left text-white"
              >
                {t("name")}
                <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                className="shadow-sm border border-gray-500 text-sm block w-full p-2.5 bg-background rounded-sm"
                placeholder={t("placeholder_name")}
                name="from_name"
                maxLength={30}
                onChange={(_event) => {
                  setIsValid(form.current?.checkValidity());
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-left text-white"
              >
                {t("email")}
                <span className="text-red-500"> *</span>
              </label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                className="shadow-sm border border-gray-500 text-sm block w-full p-2.5 bg-background rounded-sm"
                placeholder={t("placeholder_email")}
                name="from_email"
                maxLength={30}
                onChange={(_event) => {
                  setIsValid(form.current?.checkValidity());
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-left text-white"
              >
                {t("subject")}
              </label>
              <input
                type="text"
                id="subject"
                autoComplete="off"
                className="shadow-sm border border-gray-500 text-sm block w-full p-2.5 bg-background rounded-sm"
                maxLength={30}
                onChange={(_event) => {
                  setIsValid(form.current?.checkValidity());
                }}
                name="subject"
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-4 lg:mt-0">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-left text-white"
            >
              {t("message")}
              <span className="text-red-500"> *</span>
            </label>
            <textarea
              rows={10}
              id="message"
              autoComplete="off"
              className="p-1.5 w-full text-sm shadow-sm border border-gray-500 bg-background rounded-sm"
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
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={` w-full flex items-center justify-center h-12 mt-4 px-6 text-sm border rounded-sm cursor-pointer
                transition duration-300 ease-in-out hover:-translate-y-1
                disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed disabled:translate-y-0 disabled:hover:bg-transparent ${isLoading
              ? "bg-accent text-background border-accent"
              : "bg-transparent hover:bg-accent text-accent hover:text-background border-accent"
            }`}
        >
          {isLoading ? <ScaleLoader /> : t("send_message")}
        </button>
        <ReCAPTCHA
          size="invisible"
          sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
          ref={refCaptcha}
        />
      </form>
      {showModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-8 bg-background bg-opacity-80">
          <p className="mb-2 text-lg font-semibold">
            {isSuccess ? t("mail_success") : t("mail_failure")}
          </p>
          <p>{!isSuccess && errorMessage}</p>
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
