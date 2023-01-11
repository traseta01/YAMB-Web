/* GLOBALNE PROMENLJIVE */
nizBac = [0,0,0,0,0];

kDole = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
kSlob = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
kGore = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
kNaja = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

indNajave = 0;

brojBacanja = 0;

/******* UTILITY FUNCTIONS ******/

/* funkcija za random broj */
function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* funkcija koja ce niz duzine 5, da napuni vrednostima */
/* kao i da prikaze vrednosti u poljima bacene kockice */
function baciFunc()
{
	if (brojBacanja >= 3)
		return;

	/* proveri da li je ostala samo najava */
	if (brojBacanja === 1)
	{
		if (kDole.every(veciOdNule) && kSlob.every(veciOdNule) && kGore.every(veciOdNule) && indNajave === 0)
		{
			alert("Morate igrati najavu!")
			return;
		}
	}

	brojBacanja++;

	/* see if brojBacanja is ok */
	if (brojBacanja < 4)
	{
		/* add random values to array */
		for (var i=0; i<5; ++i)
		{
			if(nizBac[i] < 0)
				continue;
			else
			{
				nizBac[i] = getRandomInt(1, 6);
				var tmp = "b" + (i+1).toString();
				document.getElementById(tmp).innerText=(nizBac[i]);
			}
		}
	}
	brBacFunc(brojBacanja);
}

/* funkcija koju pozivamo na kraju upisa i koja reincijalizuje */
/* kockice i nizove i br bacanja */
function resetuj(niz1, niz2)
{
	nizBac = [0,0,0,0,0];
	brojBacanja = 0;

	for (var i=0; i<5; ++i)
	{
		niz1[i].innerHTML="&nbsp;";
		niz2[i].innerHTML="&nbsp;";
	}

	brBacFunc(brojBacanja);
}

/* funkcija za izbor kockice, postavi odg vrednost nizBac na -1*/
function izaberiKoc()
{
	/* nothing to be done if there is no text on the button */
	if(this.innerHTML == "&nbsp;")
	{
		return;
	}
	else
	{
		/* get the position of the button */
		var vred = Number(this.id[1]);
		/* set the id of izabrane button */
		var ajdi = "i" + vred;
		/* set the value of izabrane button to bacene clicked */
		document.getElementById(ajdi).innerText=this.innerText;
		/* set the value of bacene button to space */
		this.innerHTML="&nbsp;";

		/* set the according value of nizBac to -1 */
		/* so we dont use it in baciFunc */
		nizBac[vred-1] = -1;
	}
	  
}

/* funkcija koja vraca kockicu i vraca vrednost u nizBac */
function vratiKoc()
{
	/* nothing to be done if there is no text on the button */
	if(this.innerHTML == "&nbsp;")
	{
		return;
	}
	else
	{
		/* get the position of the button */
		var vred = Number(this.id[1]);
		/* set to the id of bacene button */
		var ajdi = "b" + vred;
		/* set the value of bacene button to izabrane clicked */
		document.getElementById(ajdi).innerText=this.innerText;

		/* set the according value of nizBac */
		/* so we dont use it in baciFunc */
		nizBac[vred-1] = Number(this.innerText);

		/* set the value of izabrane button to space */
		this.innerHTML="&nbsp;";
	}
	
}

/* funkcija koja upisuje tekuci broj bacanja */
function brBacFunc(vred)
{
	document.getElementById("brbac").innerText=vred;
}

/* funkcija koja racuna zbir kockica za MAX i MIN */
function zbir(niz)
{
	var tmp=0;
	for (var i=0; i<5; ++i)
	{
		tmp += niz[i];
	}

	return tmp;
}

/* napravi set od niza */
function napraviSet(niz)
{
	return new Set(niz);
}

/* funkcija koja racuna full */
function jelFul(niz)
{
	var skup = napraviSet(niz);
		
	/* ako je velicina skupa 2, kandidat za full */
	if(skup.size === 2)
	{
		var tmp = 0;

		/* since we dont have [] operator for sets in java script */
		var tmpn = Array.from(skup);

		/* koji ful? */
		for(var i=0; i<niz.length; ++i)
		{
			if(tmpn[0] === niz[i])
				++tmp;
		}

		//console.log("148 " + tmp);

		if(tmp === 2)
		{
			return tmp*tmpn[0] + 3*tmpn[1] + 40;
		}

		if(tmp === 3)
		{
			return tmp*tmpn[0] + 2*tmpn[1] + 40;
		}
	}
	else
		return 0;

}

/* funkcija koja racuna poker */
function jelPoker(niz)
{
	var skup = napraviSet(niz);

	/* since we dont have [] operator for sets in java script */
	var tmpn = Array.from(skup);

	/* ako je velicina skupa 1, imamo yamb sto je vec poker */
	if (skup.size === 1)
	{
		return 4*tmpn[0] + 50;
	}

		
	/* ako je velicina skupa 2, kandidat za poker */
	if(skup.size === 2)
	{
		var tmp = 0;


		/* koji poker? */
		for(var i=0; i<niz.length; ++i)
		{
			if(tmpn[0] === niz[i])
				++tmp;
		}

		//console.log("148 " + tmp);

		if(tmp === 1)
		{
			return 4*tmpn[1] + 50;
		}
		else if(tmp === 4)
		{
			return tmp*tmpn[0] + 50;
		}
		else
			return 0;
	}
	else
		return 0;

}

/* funkcija koja racuna kentu */
function jelKenta(niz)
{
	/* make a set from an array */
	var skup = napraviSet(niz);
	var tmpn = Array.from(skup);
	tmpn.sort();

	if(skup.size === 5)
	{
		console.log(tmpn[4]);
		/* kandidat za kentu */
		if((tmpn[4] - tmpn[0]) === 4)
		{
			/* velika ili mala kenta? */
			if(tmpn[0] === 1)
				return 75;
			else
				return 80;
		}
		else
			return 0;
	}
	else
		return 0;

}

/* funkcija koja racuna yamb */
function jelYamb(niz)
{
	var skup = napraviSet(niz);

	/* ako je velicina skupa 1 imamo yamb */
	if(skup.size === 1)
		return 5*niz[0] + 80;
	else
		return 0;
	
}

/* funkcija koja proverava da li je svaki elem niza >= od 0 */
function veciOdNule(element, index, array)
{
	return element >= 0;
}

/* funkcija koja racuna sumu kolona 1-6 */
function sumaKolFunc(niz, ajdi)
{
	var tmp = 0;
	for (var i=0; i<6; ++i)
	{
		if(niz[i] >= 0)
			tmp += niz[i];
	
	}

	tmp = (tmp > 59) ? tmp+30 : tmp;

	document.getElementById(ajdi).innerText=tmp;

	var i1 = Number(document.getElementById("suma1").innerText);
	var i2 = Number(document.getElementById("suma2").innerText);
	var i3 = Number(document.getElementById("suma3").innerText);
	var i4 = Number(document.getElementById("suma4").innerText);
	i1 = i1 + i2 + i3 + i4;
	document.getElementById("suma13").innerText=i1;

	var i1 = Number(document.getElementById("suma13").innerText);
	var i2 = Number(document.getElementById("suma14").innerText);
	var i3 = Number(document.getElementById("suma15").innerText);
	
	i1 = i1 + i2 + i3;
	document.getElementById("konrez").innerText=i1;
}

/* funkcija koja racuna sumu igara */
function sumaIgFunc(niz, ajdi)
{
	var tmp = 0;
	for (var i=8; i<12; ++i)
	{
		if(niz[i] >= 0)
			tmp += niz[i];
	
	}

	document.getElementById(ajdi).innerText=tmp;
	var i1 = Number(document.getElementById("suma9").innerText);
	var i2 = Number(document.getElementById("suma10").innerText);
	var i3 = Number(document.getElementById("suma11").innerText);
	var i4 = Number(document.getElementById("suma12").innerText);

	i1 = i1 + i2 + i3 + i4;
	document.getElementById("suma15").innerText=i1;

	var i1 = Number(document.getElementById("suma13").innerText);
	var i2 = Number(document.getElementById("suma14").innerText);
	var i3 = Number(document.getElementById("suma15").innerText);
	
	i1 = i1 + i2 + i3;
	document.getElementById("konrez").innerText=i1;
}

/* funkcija koja racuna sumu razlika */
function sumaRazFunc(niz, ajdi)
{
	var tmp = 0;

	if (niz[0] >= 0 && niz[6] >=0 && niz[7] >=0)
	{
		tmp = (niz[6] - niz[7])*niz[0];
		document.getElementById(ajdi).innerText=tmp;
	var i1 = Number(document.getElementById("suma5").innerText);
	var i2 = Number(document.getElementById("suma6").innerText);
	var i3 = Number(document.getElementById("suma7").innerText);
	var i4 = Number(document.getElementById("suma8").innerText);

	i1 = i1 + i2 + i3 + i4;
	document.getElementById("suma14").innerText=i1;

	
	var i1 = Number(document.getElementById("suma13").innerText);
	var i2 = Number(document.getElementById("suma14").innerText);
	var i3 = Number(document.getElementById("suma15").innerText);
	
	i1 = i1 + i2 + i3;
	document.getElementById("konrez").innerText=i1;
	}
}

/******* WRITE INTO FIELD FUNCTIONS ******/

/* funkcija za upis vrednosti u kliknuto polje Dole */
function upisDoleFunc()
{

	if (brojBacanja === 0)
		return;

	if (indNajave > 0)
	{
		alert("Igrali ste najavu!")
		return;
	}
	/* get the value of the field clicked */
	var vred = Number(this.id.slice(1, ));

	/* see if the previous field is not -1 */
	/* else disable writting to preserve order */
	if(vred > 1 && kDole[vred-2] < 0)
	{
		alert("Nedozvoljen upis!");
		return;
	}

	/* did we already write into this field */
	if(kDole[vred-1] >= 0)
	{
		alert("Vec ste upisali u ovo polje!");
		return;
	}
	var tmp = 0;

	var tmpNiz = [];

	/* splice izabraneKockice and baceneKockice */
	for(var i=0; i<5; ++i)
	{
		/* if innerText is a number add it to tmpNiz */
		if (Number(izabraneKockice[i].innerText))
			tmpNiz.push(Number(izabraneKockice[i].innerText));
	}

	for(var i=0; i<5; ++i)
	{
		/* if innerText is a number add it to tmpNiz */
		if (Number(baceneKockice[i].innerText))
			tmpNiz.push(Number(baceneKockice[i].innerText));
	}

	if(tmpNiz.length != 5)
		alert("Niz nije 5! vec: " + tmpNiz.length);

	/* decide which field was clicked: broj, maxmin ili igra */
	switch(vred)
	{
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			for(var i=0; i<5; ++i)
			{
				if(tmpNiz[i] == vred)
					tmp += tmpNiz[i]
			}
			/* write the sum into coresponding header */
			kDole[vred-1] = tmp;
			sumaKolFunc(kDole, "suma1");
			break;
		case 7:
		case 8:
			tmp = zbir(tmpNiz);
			kDole[vred-1] = tmp;
			sumaRazFunc(kDole, "suma5")
			break;
		case 9:
			tmp = jelFul(tmpNiz);
			kDole[vred-1] = tmp;
			sumaIgFunc(kDole, "suma9");
			break;
		case 10:
			tmp = jelPoker(tmpNiz);
			kDole[vred-1] = tmp;
			sumaIgFunc(kDole, "suma9");
			break;
		case 11:
			tmp = jelKenta(tmpNiz);
			kDole[vred-1] = tmp;
			sumaIgFunc(kDole, "suma9");
			break;
		case 12:
			tmp = jelYamb(tmpNiz);
			kDole[vred-1] = tmp;
			sumaIgFunc(kDole, "suma9");
			break;
		default:
			break;
	}

	/* write number of vred thrown */
	document.getElementById(this.id).innerText=Number(tmp);

	resetuj(izabraneKockice, baceneKockice);

}
//alert(getRandomInt(1,6));

/* funkcija za upis vrednosti u kliknuto polje Slob */
function upisSlobFunc()
{

	if (brojBacanja === 0)
		return;

	if (indNajave > 0)
	{
		alert("Igrali ste najavu!")
		return;
	}

	/* get the value of the field clicked */
	var vred = Number(this.id.slice(1, ));

	///* see if the previous field is not -1 */
	///* else disable writting to preserve order */
	//if(vred > 1 && kDole[vred-2] < 0)
	//{
	//	alert("Nedozvoljen upis!");
	//	return;
	//}
	
	/* did we already write into this field */
	if(kSlob[vred-1] >= 0)
	{
		alert("Vec ste upisali u ovo polje!");
		return;
	}

	var tmp = 0;
	var tmpNiz = [];

	/* splice izabraneKockice and baceneKockice */
	for(var i=0; i<5; ++i)
	{
		if (Number(izabraneKockice[i].innerText))
			tmpNiz.push(Number(izabraneKockice[i].innerText));
	}

	for(var i=0; i<5; ++i)
	{
		if (Number(baceneKockice[i].innerText))
			tmpNiz.push(Number(baceneKockice[i].innerText));
	}

	if(tmpNiz.length != 5)
		alert("Niz nije 5! vec: " + tmpNiz.length);

	/* decide which field was clicked: broj, maxmin ili igra */
	switch(vred)
	{
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			for(var i=0; i<5; ++i)
			{
				if(tmpNiz[i] == vred)
					tmp += tmpNiz[i]
			}
			kSlob[vred-1] = tmp;
			sumaKolFunc(kSlob, "suma2");
			sumaRazFunc(kSlob, "suma6")
			break;
		case 7:
		case 8:
			tmp = zbir(tmpNiz);
			kSlob[vred-1] = tmp;
			sumaRazFunc(kSlob, "suma6")
			break;
		case 9:
			tmp = jelFul(tmpNiz);
			kSlob[vred-1] = tmp;
			sumaIgFunc(kSlob, "suma10");
			break;
		case 10:
			tmp = jelPoker(tmpNiz);
			kSlob[vred-1] = tmp;
			sumaIgFunc(kSlob, "suma10");
			break;
		case 11:
			tmp = jelKenta(tmpNiz);
			kSlob[vred-1] = tmp;
			sumaIgFunc(kSlob, "suma10");
			break;
		case 12:
			tmp = jelYamb(tmpNiz);
			kSlob[vred-1] = tmp;
			sumaIgFunc(kSlob, "suma10");
			break;
		default:
			break;
	}

	/* write number of vred thrown */
	document.getElementById(this.id).innerText=Number(tmp);

	resetuj(izabraneKockice, baceneKockice);
}

/* funkcija za upis vrednosti u kliknuto polje Gore */
function upisGoreFunc()
{
	if (brojBacanja === 0)
		return;

	if (indNajave > 0)
	{
		alert("Igrali ste najavu!")
		return;
	}

	/* get the value of the field clicked */
	var vred = Number(this.id.slice(1, ));

	/* see if the previous field is not -1 */
	/* else disable writting to preserve order */
	if(vred < 12 && kGore[vred] < 0)
	{
		alert("Nedozvoljen upis!");
		return;
	}
	
	/* did we already write into this field */
	if(kGore[vred-1] >= 0)
	{
		alert("Vec ste upisali u ovo polje!");
		return;
	}

	var tmp = 0;
	var tmpNiz = [];

	/* splice izabraneKockice and baceneKockice */
	for(var i=0; i<5; ++i)
	{
		if (Number(izabraneKockice[i].innerText))
			tmpNiz.push(Number(izabraneKockice[i].innerText));
	}

	for(var i=0; i<5; ++i)
	{
		if (Number(baceneKockice[i].innerText))
			tmpNiz.push(Number(baceneKockice[i].innerText));
	}

	if(tmpNiz.length != 5)
		alert("Niz nije 5! vec: " + tmpNiz.length);

	/* decide which field was clicked: broj, maxmin ili igra */
	switch(vred)
	{
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			for(var i=0; i<5; ++i)
			{
				if(tmpNiz[i] == vred)
					tmp += tmpNiz[i]
			}
			kGore[vred-1] = tmp;
			sumaKolFunc(kGore, "suma3");
			sumaRazFunc(kGore, "suma7")
			break;
		case 7:
		case 8:
			tmp = zbir(tmpNiz);
			kGore[vred-1] = tmp;
			sumaRazFunc(kGore, "suma7")
			break;
		case 9:
			tmp = jelFul(tmpNiz);
			kGore[vred-1] = tmp;
			sumaIgFunc(kGore, "suma11");
			break;
		case 10:
			tmp = jelPoker(tmpNiz);
			kGore[vred-1] = tmp;
			sumaIgFunc(kGore, "suma11");
			break;
		case 11:
			tmp = jelKenta(tmpNiz);
			kGore[vred-1] = tmp;
			sumaIgFunc(kGore, "suma11");
			break;
		case 12:
			tmp = jelYamb(tmpNiz);
			kGore[vred-1] = tmp;
			sumaIgFunc(kGore, "suma11");
			break;
		default:
			break;
	}

	/* write number of vred thrown */
	document.getElementById(this.id).innerText=Number(tmp);

	resetuj(izabraneKockice, baceneKockice);
}

/* funkcija za upis vrednosti u kliknuto polje Naja */
function upisNajaFunc()
{
	/* ako je br bacanja veci od 1, nije najavljeno nedozvoljen upis */
	if (brojBacanja > 1 && indNajave < 1)
	{
		alert("Niste najavili!");
		return;
	}
	/* u suprotnom u prvom smo bacanju i zelimo da najavimo */
	else if (brojBacanja == 1 && indNajave < 1)
	{
		indNajave = Number(this.id.slice(1, ));

		/* manipulate css for different background color */
		var elm = document.getElementById(this.id);
		elm.className = (elm.className == "najaKlik") ? "polje naja" : "najaKlik";
		return;
	}
	else if (brojBacanja === 0)
		return;

	/* get the value of the field clicked */
	var vred = Number(this.id.slice(1, ));

	/* if not equal, user did not announce that field */
	if (vred != indNajave)
	{
		alert("Niste TO najavili!");
		return; 
	}
	

	///* see if the previous field is not -1 */
	///* else disable writting to preserve order */
	//if(vred < 12 && kNaja[vred] < 0)
	//{
	//	alert("Nedozvoljen upis!");
	//	return;
	//}
	
	/* did we already write into this field */
	if(kNaja[vred-1] >= 0)
	{
		alert("Vec ste upisali u ovo polje!");
		return;
	}

	var tmp = 0;
	var tmpNiz = [];

	/* splice izabraneKockice and baceneKockice */
	for(var i=0; i<5; ++i)
	{
		if (Number(izabraneKockice[i].innerText))
			tmpNiz.push(Number(izabraneKockice[i].innerText));
	}

	for(var i=0; i<5; ++i)
	{
		if (Number(baceneKockice[i].innerText))
			tmpNiz.push(Number(baceneKockice[i].innerText));
	}

	if(tmpNiz.length != 5)
		alert("Niz nije 5! vec: " + tmpNiz.length);

	/* decide which field was clicked: broj, maxmin ili igra */
	switch(vred)
	{
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
			for(var i=0; i<5; ++i)
			{
				if(tmpNiz[i] == vred)
					tmp += tmpNiz[i]
			}
			kNaja[vred-1] = tmp;
			sumaKolFunc(kNaja, "suma4");
			sumaRazFunc(kNaja, "suma8")
			break;
		case 7:
		case 8:
			tmp = zbir(tmpNiz);
			kNaja[vred-1] = tmp;
			/* suma8 */
			sumaRazFunc(kNaja, "suma8")
			break;
		case 9:
			tmp = jelFul(tmpNiz);
			kNaja[vred-1] = tmp;
			sumaIgFunc(kNaja, "suma12");
			break;
		case 10:
			tmp = jelPoker(tmpNiz);
			kNaja[vred-1] = tmp;
			sumaIgFunc(kNaja, "suma12");
			break;
		case 11:
			tmp = jelKenta(tmpNiz);
			kNaja[vred-1] = tmp;
			sumaIgFunc(kNaja, "suma12");
			break;
		case 12:
			tmp = jelYamb(tmpNiz);
			kNaja[vred-1] = tmp;
			sumaIgFunc(kNaja, "suma12");
			break;
		default:
			break;
	}

	/* write number of vred thrown */
	document.getElementById(this.id).innerText=Number(tmp);

	/* manipulate css for different background color */
	var elm = document.getElementById(this.id);
	elm.className = (elm.className == "najaKlik") ? "polje naja" : "najaKlik";
	indNajave = 0;
	resetuj(izabraneKockice, baceneKockice);

}

/******* ADD REFERENCES AND EVENT LISTENERS FOR BUTTONS *******/


/******* BACI DUGME *******/
/* referenca i event listener za baci dugme */
var baciDugme = document.getElementById("baci-dugme");
baciDugme.addEventListener('click', baciFunc, false);

/******* KOLONA DOLE DUGMICI ******/
/* referenca i event listener za kolona dole dugmice */
var kolonaDole = document.getElementsByClassName("dole");

for (var i=0; i < kolonaDole.length; ++i)
{
	kolonaDole[i].addEventListener('click', upisDoleFunc, false);
}

/******* KOLONA SLOB DUGMICI ******/
/* referenca i event listener za kolona slob dugmice */
var kolonaSlob = document.getElementsByClassName("slob");

for (var i=0; i < kolonaSlob.length; ++i)
{
	kolonaSlob[i].addEventListener('click', upisSlobFunc, false);
}

/******* KOLONA GORE DUGMICI *******/
/* referenca i event listener za kolona gore dugmice */
var kolonaGore = document.getElementsByClassName("gore");

for (var i=0; i < kolonaGore.length; ++i)
{
	kolonaGore[i].addEventListener('click', upisGoreFunc, false);
}

/******* KOLONA NAJA DUGMICI *******/
var kolonaNaja = document.getElementsByClassName("naja");

for (var i=0; i < kolonaNaja.length; ++i)
{
	kolonaNaja[i].addEventListener('click', upisNajaFunc, false);
}

/******* BACENE KOCKICE ******/
/* referenca i event listener za bacene kockice */
var baceneKockice = document.getElementsByClassName("bacene");

for (var i=0; i<baceneKockice.length; ++i)
{
	baceneKockice[i].addEventListener('click', izaberiKoc, false);
}

/******* IZABRANE KOCKICE ******/
/* referenca i event listener za izabrane kockice */
var izabraneKockice = document.getElementsByClassName("izabrane");

for (var i=0; i<izabraneKockice.length; ++i)
{
	izabraneKockice[i].addEventListener('click', vratiKoc, false);
}
