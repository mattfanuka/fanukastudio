
document.addEventListener('DOMContentLoaded', () => {
    const comparisons = document.querySelectorAll('.comparison');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
            }
        });
    },{
        threshold: 0, 
        rootMargin: "-20% 0px" // wait until 20% of element is in viewport
    });


    const children = [];

    comparisons.forEach(comparison => {
        const descendants = comparison.children;
        for(let i = 0; i < descendants.length; i++) {
            children.push(descendants[i]);
        }
    });

    children.forEach(child => observer.observe(child));

    comparisonBoxAnimations();
});

function equalizeTextBoxHeights() {
    const textBoxes = document.querySelectorAll('.text-box');
    textBoxes.forEach(box => {
        box.style.height = 'auto';
    });
    
    let maxHeight = 0;
    textBoxes.forEach(box => {
        const height = box.offsetHeight;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    

    textBoxes.forEach(box => {
        box.style.height = maxHeight + 'px';
    });


}

function pageRedirect(page) {
    window.location.href = page;
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', equalizeTextBoxHeights);

// Also run when the window is resized (in case text wraps differently)
window.addEventListener('resize', equalizeTextBoxHeights);


function comparisonBoxAnimations() {
    const cards = document.querySelectorAll('.offer-card');
    const mediaMatcher = window.matchMedia('(max-width: 800px)');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting && mediaMatcher.matches){
                entry.target.classList.add('floatUp');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px 30% 0px"
    });

    if (!mediaMatcher.matches) {
        cards.forEach(card => card.classList.remove('hidden-card'));
        return;
    }

    cards.forEach(card => {
        observer.observe(card);
    });

}
