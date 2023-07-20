document.querySelectorAll('.version-info').forEach( (vInfo)=>{

    if ( vInfo.classList.contains('activeV') )
    {
        vInfo.classList.remove('activeV');
    }

    vInfo.classList.add('prevV');
    vInfo.querySelector('.titleNum').innerHTML = vInfo.querySelector('.titleNum').innerHTML + "<span title='This is a Version of this project.' ><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-clock-history' viewBox='0 0 16 16'><path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z'/><path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z'/><path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z'/></svg></span>";

} );


if (document.querySelectorAll('.version-info')[0].classList.contains('prevV') )
{
   document.querySelectorAll('.version-info')[0].classList.remove('prevV');
   document.querySelectorAll('.version-info')[0].classList.add('activeV');

   let varf = document.querySelectorAll('.version-info')[0].querySelector('.titleNum').innerHTML;

   document.querySelectorAll('.version-info')[0].querySelector('.titleNum').innerHTML = '';

    document.querySelectorAll('.version-info')[0].querySelector('.titleNum').innerHTML = varf + '<span title="This is the Latest Version of this project."><svg  aria-label="Verified" class="x1lliihq x1n2onr6 verified" fill="currentcolor" height="12" role="img" viewBox="0 0 40 40" width="20"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg></span>';
}



function closeDivOnClick(divToClose) 
{

    const allCloseButtons = document.querySelectorAll('.js-closeBtn');

    allCloseButtons.forEach( (closeBtn)=>{

        closeBtn.addEventListener('click', ()=>{

            divToClose.classList.add('display-none');
            divToClose.style.visibility = 0;

        });

    } );
    
}

function accodrionFunction() 
{

const allAccordions = document.querySelectorAll('.js-accordion');

let acitveAccordion = null;

allAccordions.forEach( (accordion)=>{

const accordionHead = accordion.querySelector('.accordion-heading');

accordionHead.addEventListener('click', ()=>{

    acitveAccordion = accordion;

    if ( acitveAccordion !== null &&  ! acitveAccordion.classList.contains('active') )
    {

        allAccordions.forEach( (accordion)=>{
            accordion.classList.remove('active');
        });

        accordion.classList.add('active');


    }
    else
    {
        accordion.classList.remove('active');
    }


});

} );

}

accodrionFunction() ;

const informationBoutSite = document.querySelector('.information-site-container');

closeDivOnClick(informationBoutSite);