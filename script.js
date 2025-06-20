  document.addEventListener('DOMContentLoaded', function() {
            // Simulate loading
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                document.getElementById('loader').style.visibility = 'hidden';
                
                // Show player bar after loading
                setTimeout(() => {
                    document.getElementById('playerBar').classList.add('active');
                }, 500);
            }, 1500);
            
            // Mobile Menu Toggle
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const closeMenuBtn = document.getElementById('closeMenuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            mobileMenu.addEventListener('click', function(e) {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when a nav link is clicked
            const mobileNavLinks = mobileMenu.querySelectorAll('a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Player functionality
            const playPauseBtn = document.getElementById('playPauseBtn');
            const playPauseIcon = document.getElementById('playPauseIcon');
            const progressBar = document.getElementById('progressBar');
            const progress = document.getElementById('progress');
            const progressHandle = document.getElementById('progressHandle');
            const currentTimeEl = document.getElementById('currentTime');
            const durationEl = document.getElementById('duration');
            const volumeSlider = document.getElementById('volumeSlider');
            const volumeProgress = document.getElementById('volumeProgress');
            const volumeIcon = document.getElementById('volumeIcon');
            const shuffleBtn = document.getElementById('shuffleBtn');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const repeatBtn = document.getElementById('repeatBtn');
            
            let isPlaying = false;
            let isShuffled = false;
            let isRepeated = false;
            let progressInterval;
            
            // Play/Pause Button
            playPauseBtn.addEventListener('click', togglePlay);
            
            function togglePlay() {
                isPlaying = !isPlaying;
                playPauseIcon.classList.toggle('fa-play');
                playPauseIcon.classList.toggle('fa-pause');
                
                if (isPlaying) {
                    // Simulate progress animation
                    let currentSeconds = 83; // 1:23 in seconds
                    const totalSeconds = 225; // 3:45 in seconds
                    
                    progressInterval = setInterval(() => {
                        if (currentSeconds >= totalSeconds) {
                            clearInterval(progressInterval);
                            if (isRepeated) {
                                currentSeconds = 0;
                                progressInterval = setInterval(updateProgress, 1000);
                            } else {
                                isPlaying = false;
                                playPauseIcon.classList.remove('fa-pause');
                                playPauseIcon.classList.add('fa-play');
                                return;
                            }
                        }
                        
                        currentSeconds++;
                        updateProgress(currentSeconds, totalSeconds);
                    }, 1000);
                } else {
                    clearInterval(progressInterval);
                }
            }
            
            function updateProgress(currentSeconds, totalSeconds) {
                const progressPercent = (currentSeconds / totalSeconds) * 100;
                progress.style.width = `${progressPercent}%`;
                progressHandle.style.left = `${progressPercent}%`;
                
                // Update time display
                const currentMinutes = Math.floor(currentSeconds / 60);
                const currentSecs = Math.floor(currentSeconds % 60);
                currentTimeEl.textContent = `${currentMinutes}:${currentSecs < 10 ? '0' + currentSecs : currentSecs}`;
            }
            
            // Progress bar click
            progressBar.addEventListener('click', (e) => {
                const progressBarWidth = progressBar.clientWidth;
                const clickPosition = e.offsetX;
                const progressPercent = (clickPosition / progressBarWidth) * 100;
                
                progress.style.width = `${progressPercent}%`;
                progressHandle.style.left = `${progressPercent}%`;
                
                // Update time display (simulated)
                const totalSeconds = 225;
                const currentSeconds = Math.floor((progressPercent / 100) * totalSeconds);
                const currentMinutes = Math.floor(currentSeconds / 60);
                const currentSecs = Math.floor(currentSeconds % 60);
                currentTimeEl.textContent = `${currentMinutes}:${currentSecs < 10 ? '0' + currentSecs : currentSecs}`;
            });
            
            // Volume control
            volumeSlider.addEventListener('click', (e) => {
                const sliderWidth = volumeSlider.clientWidth;
                const clickPosition = e.offsetX;
                let volumePercent = (clickPosition / sliderWidth) * 100;
                
                // Ensure volume is between 0 and 100
                volumePercent = Math.max(0, Math.min(100, volumePercent));
                
                volumeProgress.style.width = `${volumePercent}%`;
                
                // Update volume icon
                if (volumePercent === 0) {
                    volumeIcon.classList.remove('fa-volume-up');
                    volumeIcon.classList.remove('fa-volume-down');
                    volumeIcon.classList.add('fa-volume-mute');
                } else if (volumePercent < 50) {
                    volumeIcon.classList.remove('fa-volume-up');
                    volumeIcon.classList.remove('fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-down');
                } else {
                    volumeIcon.classList.remove('fa-volume-down');
                    volumeIcon.classList.remove('fa-volume-mute');
                    volumeIcon.classList.add('fa-volume-up');
                }
            });
            
            // Toggle shuffle
            shuffleBtn.addEventListener('click', () => {
                isShuffled = !isShuffled;
                shuffleBtn.style.color = isShuffled ? 'var(--secondary)' : 'var(--light)';
                showToast(isShuffled ? 'Shuffle enabled' : 'Shuffle disabled');
            });
            
            // Toggle repeat
            repeatBtn.addEventListener('click', () => {
                isRepeated = !isRepeated;
                repeatBtn.style.color = isRepeated ? 'var(--secondary)' : 'var(--light)';
                showToast(isRepeated ? 'Repeat enabled' : 'Repeat disabled');
            });
            
            // Previous/Next buttons
            prevBtn.addEventListener('click', () => {
                showToast('Previous track');
            });
            
            nextBtn.addEventListener('click', () => {
                showToast('Next track');
            });
            
            // Toast notification
            function showToast(message) {
                const toast = document.getElementById('toast');
                const toastMessage = document.getElementById('toastMessage');
                
                toastMessage.textContent = message;
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
            
            // Back to Top Button
            const backToTopBtn = document.getElementById('backToTop');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
                
                // Header scroll effect
                const header = document.getElementById('mainHeader');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled-header');
                } else {
                    header.classList.remove('scrolled-header');
                }
            });
            
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Newsletter Form Submission
            const newsletterForm = document.getElementById('newsletterForm');
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input').value;
                showToast(`Thank you for subscribing with ${email}!`);
                this.reset();
            });
            
            // Album Card Animation and Play Button
            const albumCards = document.querySelectorAll('.album-card');
            
            albumCards.forEach(card => {
                const delay = card.style.getPropertyValue('--i') * 0.1;
                card.style.animationDelay = delay + 's';
                
                // Play button click
                const playBtn = card.querySelector('.play-btn');
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showToast('Playing ' + card.querySelector('.album-title').textContent);
                    
                    // Update player bar
                    const nowPlayingCover = document.querySelector('.now-playing-cover img');
                    const songTitle = document.querySelector('.song-info h4');
                    const artistName = document.querySelector('.song-info p');
                    
                    nowPlayingCover.src = card.querySelector('.album-cover img').src;
                    songTitle.textContent = card.querySelector('.album-title').textContent;
                    artistName.textContent = card.querySelector('.album-artist').textContent;
                    
                    // If not playing, start playing
                    if (!isPlaying) {
                        togglePlay();
                    }
                });
                
                // Whole card click
                card.addEventListener('click', function() {
                    showToast('Viewing album: ' + card.querySelector('.album-title').textContent);
                });
            });
            
            // CTA Buttons
            document.getElementById('startListeningBtn').addEventListener('click', function() {
                showToast('Starting your music journey!');
            });
            
            document.getElementById('goPremiumBtn').addEventListener('click', function() {
                showToast('Exploring premium options...');
            });
            
            // Search Box Animation
            const searchInputs = document.querySelectorAll('.search-box input');
            searchInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.style.transform = 'scale(1.02)';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.style.transform = 'scale(1)';
                });
                
                input.addEventListener('input', function() {
                    if (this.value.length > 0) {
                        this.parentElement.querySelector('i').style.color = 'var(--secondary)';
                    } else {
                        this.parentElement.querySelector('i').style.color = 'rgba(255, 255, 255, 0.7)';
                    }
                });
            });
            
            // Scroll Animation
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.album-card, .section-title, .hero-content, .hero-image, .section-header, .footer-col');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Initial check
            animateOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', animateOnScroll);
            
            // Audio visualization animation for mobile menu
            const visualizerBars = document.querySelectorAll('.visualizer-bar');
            let animationFrame;
            
            function animateBars() {
                visualizerBars.forEach((bar, index) => {
                    const randomHeight = Math.random() * 20 + 5;
                    bar.style.height = `${randomHeight}px`;
                });
                animationFrame = requestAnimationFrame(animateBars);
            }
            
            mobileMenuBtn.addEventListener('click', function() {
                animateBars();
            });
            
            closeMenuBtn.addEventListener('click', function() {
                cancelAnimationFrame(animationFrame);
            });
        });