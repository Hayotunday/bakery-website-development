"use client";

import { useState } from "react";
import Header from "@/components/header";

export default function RefresherPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    heardAbout: "",
    attendedBefore: "",
    needRefresher: "",
    ifYesWhy: "",
    topics: "",
    biggestChallenge: "",
    expectations: "",
    futureCourses: "",
    willingToPay: "",
    twoAreas: "",
    joinCommunity: "",
    platform: "",
    recommend: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const payload = {
        ...formData,
        serviceType: "refresher-class",
        note: "Refresher form submission",
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registration submitted — we'll be in touch.");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          heardAbout: "",
          attendedBefore: "",
          needRefresher: "",
          ifYesWhy: "",
          topics: "",
          biggestChallenge: "",
          expectations: "",
          futureCourses: "",
          willingToPay: "",
          twoAreas: "",
          joinCommunity: "",
          platform: "",
          recommend: "",
        });
      } else {
        setMessage(data.error || "Failed to submit registration.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">
          Refresher Class Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-xs font-bold">Full Name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded border"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-bold">Phone Number</span>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded border"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-xs font-bold">Email Address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 rounded border"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-xs font-bold">
              How did you hear about this refresher class?
            </span>
            <input
              name="heardAbout"
              value={formData.heardAbout}
              onChange={handleChange}
              className="px-3 py-2 rounded border"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                Have you attended any Perfectwhite Cakes training before?
              </span>
              <select
                name="attendedBefore"
                value={formData.attendedBefore}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                Do you think you need this refresher class?
              </span>
              <select
                name="needRefresher"
                value={formData.needRefresher}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-bold">If yes, why?</span>
              <input
                name="ifYesWhy"
                value={formData.ifYesWhy}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="text-xs font-bold">
              Which baking topic(s) would you like us to cover during the
              refresher class?
            </span>
            <textarea
              name="topics"
              value={formData.topics}
              onChange={handleChange}
              className="px-3 py-2 rounded border"
              rows={3}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-xs font-bold">
              What is the biggest challenge you currently face in your baking
              business?
            </span>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              className="px-3 py-2 rounded border"
              rows={3}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-xs font-bold">
              What are your expectations from this refresher class? (What would
              you like to take home?)
            </span>
            <textarea
              name="expectations"
              value={formData.expectations}
              onChange={handleChange}
              className="px-3 py-2 rounded border"
              rows={3}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-xs font-bold">
              If we organize future trainings, what other course(s) would you
              like to learn?
            </span>
            <input
              name="futureCourses"
              value={formData.futureCourses}
              onChange={handleChange}
              className="px-3 py-2 rounded border"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                At your current stage, what amount would you be willing to pay
                for a course like this?
              </span>
              <input
                name="willingToPay"
                value={formData.willingToPay}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                Apart from baking, list two areas of your life or business where
                you would like further training.
              </span>
              <input
                name="twoAreas"
                value={formData.twoAreas}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                Would you like to join the Perfectwhite Cakes community for
                updates, mentorship, and future opportunities?
              </span>
              <select
                name="joinCommunity"
                value={formData.joinCommunity}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-xs font-bold">
                If yes, which platform do you prefer?
              </span>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              >
                <option value="">Select</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Telegram">Telegram</option>
                <option value="Facebook">Facebook</option>
                <option value="Email">Email</option>
              </select>
            </label>

            <label className="flex flex-col">
              <span className="text-xs font-bold">
                Would you be willing to recommend Perfectwhite Cakes training to
                others?
              </span>
              <select
                name="recommend"
                value={formData.recommend}
                onChange={handleChange}
                className="px-3 py-2 rounded border"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-accent text-white rounded font-bold"
            >
              {isSubmitting ? "Sending..." : "Submit Registration"}
            </button>
          </div>

          {message && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
