import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

# ----------------- PAGE CONFIG -----------------
st.set_page_config(page_title="Carbon Footprint Dashboard", layout="wide")

# ----------------- NAVBAR -----------------
st.markdown(
    """
    <style>
        .navbar {
            background-color: #2b9348;
            padding: 1rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            border-radius: 8px;
        }
    </style>
    <div class="navbar">🌱 Carbon Footprint Dashboard</div>
    """,
    unsafe_allow_html=True,
)

st.write("")

# ----------------- FORM -----------------
st.subheader("📋 Enter Event / Travel Details")

with st.form("carbon_form"):
    year = st.selectbox("Select Year", list(range(2020, 2031)))
    event_type = st.selectbox("Event Type", ["Concert", "Conference", "Meetup", "Wedding", "Other"])
    attendees = st.number_input("Number of Attendees", min_value=1, step=1)
    transport_mode = st.selectbox("Primary Transport", ["Car", "Bus", "Train", "Flight"])
    distance = st.number_input("Average Travel Distance per Attendee (km)", min_value=1, step=1)
    submit = st.form_submit_button("Estimate Emissions")

# ----------------- EMISSION FACTORS -----------------
emission_factors = {
    "Car": 0.12,     # kg CO2 per km
    "Bus": 0.05,
    "Train": 0.04,
    "Flight": 0.25,
}

# ----------------- RESULTS -----------------
if submit:
    # Calculate emissions
    total_emission = attendees * distance * emission_factors[transport_mode]

    st.success(f"🌍 Estimated Emission for {event_type} in {year}: **{total_emission:.2f} kg CO₂**")

    with st.expander("📊 View Breakdown"):
        st.write("### Emission Breakdown")
        data = pd.DataFrame({
            "Category": ["Attendees", "Distance", "Emission Factor"],
            "Value": [attendees, distance, emission_factors[transport_mode]]
        })
        st.table(data)

        # Pie chart
        labels = ["Emissions", "Remaining Budget"]
        sizes = [total_emission, max(1000 - total_emission, 0)]
        fig, ax = plt.subplots()
        ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
        ax.axis("equal")
        st.pyplot(fig)

st.markdown("---")
st.caption("© 2025 CarbonSense | Built with Streamlit 🌱")
