let counter = 37

do {
	fetch('http://www.dnd5eapi.co/api/equipment/' + counter)
    	.then(resp => resp.json())
		.then(data => {
	fetch('http://localhost:3000/api/v1/weapons', {
				method: "POST",
        headers: {"Content-Type":"application/json"},
				body: JSON.stringify({
					name: data.name,
      		attk_bonus: 0,
      		damage: `${data.damage.dice_count}d${data.damage.dice_value}`
        })
    })
  })
	counter--
} while (counter > 0)



let counter = 38

do {
	fetch('http://www.dnd5eapi.co/api/equipment/' + counter)
		.then(resp => resp.json())
		.then(data => {
			fetch('http://localhost:3000/api/v1/armors', {
						method: "POST",
		        headers: { "Content-Type" : "application/json" },
						body: JSON.stringify({
							name: data.name,
							armor_class: data.armor_class.base
		        })
					})
				})
				counter++
			}  while (counter < 50)
