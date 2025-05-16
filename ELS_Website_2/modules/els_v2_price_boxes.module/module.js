const d = new Date();
let year = d.getFullYear(),
    nextYear = year + 1;
$('a.current-year').text(year);
$('a.next-year').text(nextYear);