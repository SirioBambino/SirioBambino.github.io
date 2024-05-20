---
# Keep this front matter so that liquid is processed
---

// Function that smoothly scrolls site to the given section
// Also has an option to scroll to top of page
var scrollToSection = function(id = top) {
  if (id == top) { 
    window.scrollTo(0, 0); 
    return;
  }
  let section = document.getElementById(id);
  window.scrollTo(0, section.offsetTop - 40); // Offset position for better framing
};

// Use liquid to initialise needed variables for each section
{%- for section in site.sections %}
let {{ section.sectionID }} = document.getElementById("{{ section.sectionID }}");
let {{ section.sectionID }}Nav = document.getElementById("{{ section.sectionID }}-nav");
{%- endfor %}

// When the document is ready, use liquid to set the value for each variable
$(document).ready(function() {
  {%- for section in site.sections %}
  let {{ section.sectionID }} = document.getElementById("{{ section.sectionID }}");
  let {{ section.sectionID }}Nav = document.getElementById("{{ section.sectionID }}-nav");
  {%- endfor %}
});

// This function checks the current location of the page using the window scroll value and 
// assigns a class to the nav menu button that corresponds to the current location so that 
// it can be styled.
// Liquid is used to create an if else branch that works for any amount of sections.
var selectCurrentSection = function() {
  {% comment %} Iterate through each section {% endcomment %}
  {%- for section in site.sections -%}

  {% comment %} Start if statement on the first iteration {% endcomment %}
  {%- if forloop.first -%}

  // Check if Y scroll value is between the first section and the next
  if (window.scrollY >= {{ section.sectionID }}.offsetTop - 300 && 
    window.scrollY < {{ site.sections[forloop.index].sectionID | downcase }}.offsetTop - 300 ) {
      // Remove current class from all sections except current one
    {%- for s in site.sections -%}
    {%- if s != section %}
    {{ s.sectionID | downcase }}Nav.classList.remove("current");
    {%- endif %}
    {%- endfor %}

    // Add current class to section
    {{ section.sectionID }}Nav.classList.add("current");
  }

  {% comment %} Create last if else block on the last iteration {% endcomment %}
  {%- elsif forloop.last %}

  // Check if Y scroll value is after the last section
  else if (window.scrollY >= {{ section.sectionID }}.offsetTop - 300) {
    // Remove current class from all sections except current one
    {%- for s in site.sections -%}
    {%- if s != section %}
    {{ s.sectionID | downcase }}Nav.classList.remove("current");
    {%- endif %}
    {%- endfor %}

    // Add current class to section
    {{ section.sectionID }}Nav.classList.add("current");
  }

  {% comment %} Otherwise create a normal if else block {% endcomment %}
  {%- else -%}

  // Check if Y scroll value is between the current section and the next
  else if (window.scrollY >= {{ section.sectionID }}.offsetTop - 300 && 
    window.scrollY < {{ site.sections[forloop.index].sectionID | downcase }}.offsetTop - 300 ) {
      // Remove current class from all sections except current one
      {%- for s in site.sections -%}
      {%- if s != section %}
      {{ s.sectionID | downcase }}Nav.classList.remove("current");
      {%- endif %}
      {%- endfor %}

    // Add current class to section
    {{ section.sectionID }}Nav.classList.add("current");
  }
  {%- endif -%}
  {%- endfor -%}

  // Remove current class from each section 
  else {
    {%- for section in site.sections %}
    {{ section.sectionID }}Nav.classList.remove("current");
    {%- endfor -%}
  }
}

// Select current section on page load and during scroll
selectCurrentSection();

// Using throttle on the scroll event listener will make it run every 10 ms
window.addEventListener("scroll", throttle(selectCurrentSection, 10));