import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(page_title="CarbonTrack", layout="wide")

# Sidebar navigation
page = st.sidebar.radio("Navigate", ["Landing Page", "Dashboard"])

if page == "Landing Page":
    # Load and display HTML
    with open("landing.html", "r", encoding="utf-8") as f:
        html_code = f.read()
    components.html(html_code, height=900, scrolling=True)

elif page == "Dashboard":
    st.title("🌍 Carbon Footprint Dashboard")
    st.write("Estimate event emissions using AI.")
    
    with st.form("event_form"):
        attendees = st.number_input("Number of Attendees", 1, 100000)
        year = st.selectbox("Year", [2024, 2025, 2026])
        event_type = st.selectbox("Event Type", ["Concert", "Meetup", "Festival"])
        submit = st.form_submit_button("Estimate Emission")
        
        if submit:
            emission = attendees * 0.02  # simple placeholder model
            st.success(f"Estimated Emission for {event_type} in {year}: {emission:.2f} Tons CO₂")
