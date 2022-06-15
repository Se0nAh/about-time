const bodySection = document.getElementsByTagName("body")[0];
const header = document.createElement('header')
const headerContent = document.createElement('div')
header.className = "nav-container"
headerContent.className = "nav-content"
header.append(headerContent)
const logo = document.createElement('a')
logo.href = "/"
const logoImg = document.createElement('img')
logoImg.src = "../images/logo-white.png"
logoImg.width = 133.5
logoImg.height = 15
logo.append(logoImg)

headerContent.append(logo)
headerContent.insertAdjacentHTML('beforeend', `
         <div class="nav-button-container">
            <a href="/artists" class="nav-button">ARTISTS</a>
            <a href="/gallery" class="nav-button">GALLERY</a>
            <a href="/guest-book" class="nav-button">GUEST BOOK</a>
            <a href="/photo-booth" class="nav-button">PHOTO BOOTH</a>
        </div>
    `)

const headerSection = document.createElement('div')
bodySection.insertBefore(headerSection, bodySection.firstChild)
bodySection.insertBefore(header, bodySection.firstChild)
bodySection.style.minHeight = window.innerHeight - header.clientHeight + 'px';
headerSection.style.cssText = `
    width: 100%;
    height: ${header.clientHeight}px;
`

// console.log(window.location.pathname)
console.log(window.location.pathname.includes('artworks'))
if (window.location.pathname.includes('photo-booth')
    || window.location.pathname.includes('gallery')
    || window.location.pathname.includes('artists')
    || window.location.pathname.includes('guest-book')) {
    logoImg.src = "../images/logo-default.png"
    document.documentElement.style.setProperty('--nav-background-color', '#d9e5e9');
    document.documentElement.style.setProperty('--nav-text-color', '#65828c');
} else {
    logoImg.src = "../images/logo-white.png"
    document.documentElement.style.setProperty('--nav-background-color', 'rgba(255, 255, 255 , 0.3)');
    document.documentElement.style.setProperty('--nav-text-color', 'white');
    header.style.textShadow = "rgba(0, 0, 0, 0.3) 1px 0 6px"
}