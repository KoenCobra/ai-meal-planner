interface EmailTemplateProps {
  name: string;
}

export function EmailTemplate({ name }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        lineHeight: "1.6",
        color: "#f8fafc",
        backgroundColor: "#0f172a",
        margin: "0",
        padding: "0",
        minHeight: "100vh",
      }}
    >
      {/* Animated Background Effects */}
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background:
            "radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)",
          zIndex: 0,
        }}
      ></div>

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
          padding: "60px 20px",
          textAlign: "center" as const,
          position: "relative" as const,
          overflow: "hidden",
        }}
      >
        {/* Header Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
            zIndex: 1,
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 16px 0",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span style={{ color: "#ffffff" }}>Bubu</span>
            <span style={{ color: "#dbeafe", marginLeft: "12px" }}>AI</span>
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "#e0f2fe",
              margin: "0",
              fontWeight: "500",
              opacity: "0.9",
            }}
          >
            Your Intelligent AI-Powered Meal Planning Assistant
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#1e293b",
          borderRadius: "24px",
          marginTop: "-40px",
          position: "relative" as const,
          zIndex: 3,
          boxShadow:
            "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
        }}
      >
        {/* Welcome Section */}
        <div style={{ padding: "50px 40px" }}>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#f8fafc",
              marginBottom: "20px",
              textAlign: "center" as const,
              background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Bubu AI, {name}!
          </h2>

          <p
            style={{
              fontSize: "20px",
              color: "#cbd5e1",
              textAlign: "center" as const,
              marginBottom: "28px",
              lineHeight: "1.7",
            }}
          >
            Congratulations on subscribing to{" "}
            <strong
              style={{
                background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Bubu AI
            </strong>
            ! 🚀
          </p>

          <p
            style={{
              fontSize: "17px",
              color: "#94a3b8",
              textAlign: "center" as const,
              marginBottom: "40px",
              lineHeight: "1.6",
            }}
          >
            You&apos;re now part of a community of intelligent home cooks who
            are transforming their culinary experience with AI. We wish you all
            the best on your cooking journey and can&apos;t wait to see the
            amazing meals you&apos;ll create!
          </p>

          {/* PWA Installation Section */}
          <div
            style={{
              backgroundColor: "#0f172a",
              borderRadius: "16px",
              padding: "32px",
              marginBottom: "40px",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#60a5fa",
                marginBottom: "20px",
                textAlign: "center" as const,
              }}
            >
              📲 Install Bubu AI as a Mobile App!
            </h3>

            <p
              style={{
                fontSize: "17px",
                color: "#cbd5e1",
                textAlign: "center" as const,
                marginBottom: "32px",
              }}
            >
              Get the full app experience by installing Bubu AI as a Progressive
              Web App (PWA) on your device!
            </p>

            {/* Android Instructions */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#60a5fa",
                  marginBottom: "16px",
                }}
              >
                For Android Users:
              </h4>
              <ol
                style={{
                  margin: "0",
                  paddingLeft: "20px",
                  fontSize: "15px",
                  color: "#cbd5e1",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  Open Chrome browser and go to{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    bubuaimealplanner.com
                  </strong>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Tap the{" "}
                  <strong style={{ color: "#60a5fa" }}>menu (3 dots)</strong> in
                  the top right corner
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Select{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    &quot;Add to Home screen&quot;
                  </strong>{" "}
                  or{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    &quot;Install app&quot;
                  </strong>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Confirm by tapping{" "}
                  <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong>{" "}
                  or{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    &quot;Install&quot;
                  </strong>
                </li>
                <li style={{ marginBottom: "0" }}>
                  Find the Bubu AI icon on your home screen and enjoy!
                </li>
              </ol>
            </div>

            {/* iOS Instructions */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid rgba(14, 165, 233, 0.3)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#0ea5e9",
                  marginBottom: "16px",
                }}
              >
                For iPhone/iPad Users:
              </h4>
              <ol
                style={{
                  margin: "0",
                  paddingLeft: "20px",
                  fontSize: "15px",
                  color: "#cbd5e1",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  Open Safari browser and go to{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    bubuaimealplanner.com
                  </strong>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Tap the{" "}
                  <strong style={{ color: "#60a5fa" }}>Share button</strong>{" "}
                  (square with arrow) at the bottom
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Scroll down and select{" "}
                  <strong style={{ color: "#60a5fa" }}>
                    &quot;Add to Home Screen&quot;
                  </strong>
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Customize the name if desired, then tap{" "}
                  <strong style={{ color: "#60a5fa" }}>&quot;Add&quot;</strong>
                </li>
                <li style={{ marginBottom: "0" }}>
                  The Bubu AI icon will appear on your home screen!
                </li>
              </ol>
            </div>

            {/* PWA Benefits */}
            <div
              style={{
                backgroundColor: "#1e293b",
                borderRadius: "12px",
                padding: "24px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#60a5fa",
                  marginBottom: "16px",
                }}
              >
                Benefits of Installing as PWA:
              </h4>
              <ul
                style={{
                  margin: "0",
                  paddingLeft: "20px",
                  fontSize: "15px",
                  color: "#cbd5e1",
                }}
              >
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>
                    App-like Experience:
                  </strong>{" "}
                  Works like a native mobile app
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>Offline Access:</strong>{" "}
                  Access your saved recipes without internet
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>Faster Loading:</strong>{" "}
                  Instant startup and smooth performance
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>
                    Home Screen Access:
                  </strong>{" "}
                  Quick access from your device&apos;s home screen
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>
                    Push Notifications:
                  </strong>{" "}
                  Stay updated with recipe suggestions
                </li>
                <li style={{ marginBottom: "6px" }}>
                  <strong style={{ color: "#60a5fa" }}>Full Screen:</strong>{" "}
                  Immersive experience without browser bars
                </li>
                <li style={{ marginBottom: "0" }}>
                  <strong style={{ color: "#60a5fa" }}>
                    Battery Efficient:
                  </strong>{" "}
                  Optimized for mobile device performance
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: "center" as const }}>
            <a
              href="https://bubuaimealplanner.com/bubu-ai"
              style={{
                display: "inline-block",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "18px 40px",
                borderRadius: "16px",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa)",
                boxShadow:
                  "0 8px 32px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              Start Creating Amazing Recipes
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "50px 20px",
          textAlign: "center" as const,
          position: "relative" as const,
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            margin: "0 0 20px 0",
          }}
        >
          Need help? Contact our support team at{" "}
          <a
            href="mailto:info@bubuaimealplanner.com"
            style={{
              color: "#60a5fa",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            info@bubuaimealplanner.com
          </a>
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            margin: "0 0 20px 0",
          }}
        >
          © 2025{" "}
          <strong
            style={{
              background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Bubu AI
          </strong>
          . All rights reserved.
        </p>

        <div
          style={{
            fontSize: "14px",
            color: "#64748b",
          }}
        >
          <a
            href="https://bubuaimealplanner.com/privacy-policy"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            Privacy Policy
          </a>
          <a
            href="https://bubuaimealplanner.com/terms-of-service"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  );
}
