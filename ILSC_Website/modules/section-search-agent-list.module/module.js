document.addEventListener("DOMContentLoaded", function () {
    var dropdown = document.getElementById("countryDropdown");
    var agentCards = document.querySelectorAll(".agent-card");

    dropdown.addEventListener("change", function () {
        var selectedCountry = dropdown.value;

        // Hide all agent cards first
        agentCards.forEach(function (card) {
            card.style.display = "none";
        });

        // Show only matching country agents
        if (selectedCountry) {
            document.querySelectorAll('.agent-card[data-country="' + selectedCountry + '"]').forEach(function (card) {
                card.style.display = "block";
            });
        }
    });
});