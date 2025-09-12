import streamlit as st

# ----------------------------------
# Page Config
# ----------------------------------
st.set_page_config(page_title="Carbon Footprint Estimator", page_icon="🌍", layout="wide")

# ----------------------------------
# Navbar (Hack: Use columns + markdown)
# ----------------------------------
st.markdown(
    """
    <style>
    .navbar {
        background-color: #0A2647;
        padding: 1rem;
        border-radius: 12px;
    }
    .navbar a {
        text-decoration: none;
        margin: 0 15px;
        color: white;
        font-weight: bold;
    }
    .navbar a:hover {
        color: #14FFEC;
    }
    </style>
    <div class="navbar">
        <a href="#">Home</a>
        <a href="#">Estimator</a>
        <a href="#">Events</a>
        <a href="#">About</a>
    </div>
    """,
    unsafe_allow_html=True
)

# ----------------------------------
# Hero Section
# ----------------------------------
st.markdown(
    """
    <h1 style='text-align: center; color: #0A2647;'>🌍 Carbon Footprint Estimator</h1>
    <p style='text-align: center; font-size:18px;'>
    Estimate your daily carbon footprint, explore sustainability events, and take steps toward a greener future.
    </p>
    """,
    unsafe_allow_html=True
)

st.write("---")

# ----------------------------------
# Form Section
# ----------------------------------
with st.form("footprint_form"):
    st.subheader("🚗 Travel")
    miles_car = st.number_input("Daily Car Distance (km)", 0, 500, 10)
    miles_bus = st.number_input("Daily Bus Distance (km)", 0, 500, 5)

    st.subheader("⚡ Energy")
    electricity = st.number_input("Monthly Electricity Usage (kWh)", 0, 2000, 150)

    st.subheader("🍽 Food")
    meat_meals = st.slider("Meat-based meals per week", 0, 21, 7)

    # Year dropdown
    year = st.selectbox("Select Year", ["2023", "2024", "2025"])

    # Event details expandable
    with st.expander("📅 Event Details"):
        event = st.radio("Select Event Type", ["Concert", "Conference", "Meetup"])
        attendees = st.number_input("Expected Attendees", 0, 10000, 100)

    submitted = st.form_submit_button("🌱 Estimate Emission")

# ----------------------------------
# Emission Calculation
# ----------------------------------
if submitted:
    car_emission = miles_car * 0.12
    bus_emission = miles_bus * 0.05
    electricity_emission = (electricity / 30) * 0.4
    meat_emission = meat_meals * 2.5

    total = car_emission + bus_emission + electricity_emission + meat_emission

    # Stylish Card for Result
    st.markdown(
        f"""
        <div style='background: linear-gradient(135deg, #14FFEC, #0A2647);
        padding: 25px; border-radius: 15px; text-align:center; color:white;'>
            <h2>🌱 Estimated Daily Carbon Emission for {year}</h2>
            <h1>{total:.2f} kg CO₂e</h1>
        </div>
        """,
        unsafe_allow_html=True
    )

    # Expandable for breakdown
    with st.expander("📊 Emission Breakdown"):
        st.write(f"🚗 Car: **{car_emission:.2f} kg CO₂e**")
        st.write(f"🚌 Bus: **{bus_emission:.2f} kg CO₂e**")
        st.write(f"⚡ Electricity: **{electricity_emission:.2f} kg CO₂e**")
        st.write(f"🍖 Meat: **{meat_emission:.2f} kg CO₂e**")
