import { useState, useEffect } from "react";
import { StepProps } from "../types";
import {
  Search,
  Store,
  Info,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function InputStep({ onNext, data }: StepProps) {
  const [rawInput, setRawInput] = useState(
    data.url?.split("placeid=")[1] || ""
  );

  const [businessName, setBusinessName] = useState(
    data.businessName || ""
  );

  const [showTutorial, setShowTutorial] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  // Automatically validate and extract Place ID when input changes
  useEffect(() => {
    if (!rawInput.trim()) {
      setErrorMsg(null);
      setWarningMsg(null);
      return;
    }

    const input = rawInput.trim();

    setErrorMsg(null);
    setWarningMsg(null);

    // Check if the user pasted a complete URL instead of a Place ID
    if (input.includes("http")) {
      try {
        const urlObj = new URL(input);

        const placeIdParam = urlObj.searchParams.get("placeid");

        if (placeIdParam) {
          // Automatically replace the URL with the extracted Place ID
          setRawInput(placeIdParam);
          return;
        }

        // Reject standard Google Maps links without a Place ID
        if (
          input.includes("maps.app.goo.gl") ||
          input.includes("google.com/maps")
        ) {
          setErrorMsg(
            "Use the Google Place ID Finder to get your Place ID instead of a standard Google Maps link."
          );

          return;
        }

      } catch (e) {
        setErrorMsg("Invalid URL.");
        return;
      }
    }

    // Basic Place ID validation
    // Most Google Place IDs begin with ChIJ, but formats can vary
    if (input.length < 10) {
      setErrorMsg(
        "Your Place ID is too short. Make sure you copy the entire code."
      );

    } else if (!input.startsWith("ChIJ")) {
      setWarningMsg(
        "Note: Google Place IDs often begin with 'ChIJ'. Please double-check that you entered the correct code."
      );
    }

  }, [rawInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const finalPlaceId = rawInput.trim();
    const finalName = businessName.trim();

    if (!finalPlaceId || !finalName) {
      setErrorMsg(
        "Business name and Google Place ID are required."
      );

      return;
    }

    if (errorMsg) {
      return;
    }

    // Generate the direct Google review URL
    const finalUrl =
      `https://search.google.com/local/writereview?placeid=${finalPlaceId}`;

    onNext({
      url: finalUrl,
      businessName: finalName
    });
  };

  // Warnings do not disable the submit button
  const isSubmitDisabled =
    !rawInput.trim() ||
    !businessName.trim() ||
    errorMsg !== null;

  return (
    <div className="w-full max-w-2xl py-4 md:py-8">

      {/* MAIN FORM */}
      <div className="bg-white border-4 border-[#0F0F0F] shadow-hard-lg p-6 md:p-10 relative">

        <div className="absolute top-0 right-0 bg-[#0F0F0F] text-white font-mono text-xs font-bold px-3 py-1 uppercase">
          Step 01 / Business Details
        </div>

        <div className="mb-8 text-left border-b-2 border-[#0F0F0F] pb-4">

          <h2 className="text-2xl md:text-3xl font-display font-extrabold uppercase tracking-tight">
            Let's Get You More Google Reviews
          </h2>

          <p className="text-gray-600 font-medium text-sm mt-2 leading-relaxed">
            It takes less than a minute. Enter your business name
            and{" "}
            <strong>Google Maps Place ID</strong>{" "}
            below to create a QR code that takes customers
            directly to your Google review page.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left mb-8"
        >

          {/* FIELD 1 - BUSINESS NAME */}
          <div className="space-y-2">

            <label className="font-display font-bold text-sm uppercase flex items-center gap-2">

              <Store className="w-4 h-4" />

              1. Your Business Name

            </label>

            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Example: Atlanta Coffee Company"
              maxLength={60}
              className="w-full bg-white border-2 border-[#0F0F0F] p-3.5 text-base md:text-lg font-bold focus:bg-[#F4F4F0] focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition-colors placeholder:text-gray-400 placeholder:font-normal font-sans"
              required
            />

          </div>

          {/* FIELD 2 - GOOGLE PLACE ID */}
          <div className="space-y-2">

            <div className="flex items-center justify-between">

              <label className="font-display font-bold text-sm uppercase flex items-center gap-2">

                <Search className="w-4 h-4" />

                2. Enter Your Place ID

              </label>

              <button
                type="button"
                onClick={() => setShowTutorial(!showTutorial)}
                className="text-[var(--color-accent)] hover:text-[var(--color-ink)] font-bold text-xs uppercase flex items-center gap-1 transition-colors underline decoration-2 underline-offset-2 cursor-pointer"
              >

                <HelpCircle className="w-3.5 h-3.5" />

                How Do I Find My Place ID?

              </button>

            </div>

            <input
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Example: ChIJxxxxxxxxxxxxxxxx"
              maxLength={200}
              className={`w-full bg-white border-2 p-3.5 text-sm md:text-base font-mono font-bold focus:outline-none focus:ring-2 transition-colors placeholder:text-gray-400 placeholder:font-normal
                ${
                  errorMsg
                    ? "border-red-500 focus:bg-red-50 focus:ring-red-500/20 text-red-700"
                    : "border-[#0F0F0F] focus:bg-[#F4F4F0] focus:ring-[#FF4500] text-[#0F0F0F]"
                }`}
              required
            />

            {/* ERROR AND WARNING FEEDBACK */}
            <AnimatePresence>

              {errorMsg && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto"
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="text-red-600 font-medium text-xs flex items-start gap-1.5 mt-2"
                >

                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />

                  <p>{errorMsg}</p>

                </motion.div>
              )}

              {warningMsg && !errorMsg && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto"
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="text-amber-600 font-medium text-xs flex items-start gap-1.5 mt-2 bg-amber-50 p-2 border border-amber-200"
                >

                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />

                  <p>{warningMsg}</p>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

          {/* ACTION BUTTON */}
          <div className="pt-4">

            <button
              type="submit"
              disabled={isSubmitDisabled}
              className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-display font-bold text-xl py-4 border-2 border-[#0F0F0F] shadow-hard hover:shadow-hard-hover transition-all flex items-center justify-center gap-2 uppercase cursor-pointer"
            >

              <span>GENERATE PRINTABLE QR CODE</span>

              <ArrowRight className="w-6 h-6" />

            </button>

          </div>

        </form>

        {/* TUTORIAL DROPDOWN - HOW TO FIND YOUR PLACE ID */}
        <AnimatePresence>

          {showTutorial && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0
              }}
              animate={{
                height: "auto",
                opacity: 1
              }}
              exit={{
                height: 0,
                opacity: 0
              }}
              className="overflow-hidden"
            >

              <div className="bg-[#FFFDE6] border-2 border-[#0F0F0F] p-5 text-sm shadow-[4px_4px_0px_0px_#0F0F0F]">

                <div className="flex items-center gap-2 font-bold font-display uppercase mb-3 text-[#0F0F0F] border-b-2 border-[#0F0F0F] pb-2">

                  <Info className="w-5 h-5 text-[var(--color-accent)]" />

                  Find Your Place ID in 3 Easy Steps (Free)

                </div>

                <p className="text-gray-700 font-medium mb-4 text-xs md:text-sm">

                  A Place ID is a unique identifier assigned
                  to your business by Google. Using this ID,
                  customers who scan your QR code will be{" "}

                  <strong>
                    directed straight to your Google review page
                    without having to search for your business.
                  </strong>

                </p>

                <ol className="list-decimal pl-5 space-y-3 text-gray-800 font-medium text-xs md:text-sm">

                  <li>

                    Open the free{" "}

                    <a
                      href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-bold underline hover:text-[var(--color-accent)]"
                    >
                      Google Place ID Finder
                    </a>.

                  </li>

                  <li>

                    Enter your business name in the map's
                    search box.

                  </li>

                  <li>

                    Select your business from the search
                    results. An information popup will appear
                    on the map.{" "}

                    <strong>
                      Copy the code displayed next to "Place ID."
                    </strong>{" "}

                    It often begins with{" "}

                    <code className="bg-white font-mono px-1 py-0.5 border border-[#0F0F0F]">
                      ChIJ...
                    </code>

                    .

                    {/* PLACE ID EXAMPLE IMAGES */}
                    <div className="mt-4 flex flex-col gap-3 w-full max-w-[400px] md:max-w-[480px]">

                      <img
                        src="/placeid-bagian1.webp"
                        alt="Step 1: Search for your business name"
                        className="w-full h-auto block drop-shadow-sm rounded-md"
                      />

                      <img
                        src="/placeid-bagian2.webp"
                        alt="Step 2: Copy your Google Place ID"
                        className="w-full h-auto block drop-shadow-sm rounded-md"
                      />

                    </div>

                  </li>

                </ol>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* PRIVACY NOTICE */}
      <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">

        <ShieldCheck className="w-4 h-4 text-green-600" />

        <span>
          Privacy Protected &bull; Processed Locally
        </span>

      </div>

    </div>
  );
}
