import { Hero } from "../../types";

const tbody = document.querySelector("table tbody");
fetch("/api/heroes")
    .then(r => r.json())
    .then((heroes: Hero[]) => heroes
        .forEach(hero => tbody
            .innerHTML += `
                <tr>
                    <td>${hero.name}</td>
                </tr>`));