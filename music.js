// Background Music Player for BoomCart

document.addEventListener('DOMContentLoaded', function() {
    // Check if we already have a music iframe
    let musicIframe = document.getElementById('music-iframe');
    
    // If the iframe exists, don't create a new one - this means we're on a new page
    // but the iframe is still in the DOM (it wasn't recreated)
    if (!musicIframe) {
        // Create a hidden iframe to hold the music player
        musicIframe = document.createElement('iframe');
        musicIframe.id = 'music-iframe';
        musicIframe.style.display = 'none';
        musicIframe.name = 'musicFrame'; // Give it a name for targeting
        
        // Create a simple HTML page with audio player
        const musicHTML = `
            <html>
            <head>
                <title>Background Music</title>
                <style>body { margin: 0; padding: 0; }</style>
            </head>
            <body>
                <audio id="music-player">
                    <source src="music/track1.mp3" type="audio/mpeg">
                </audio>
                <script>
                    // List of tracks
                    const tracks = [
                        'music/track1.mp3',
                        'music/track2.mp3',
                        'music/track3.mp3',
                        'music/track4.mp3',
                        'music/track5.mp3',
                        'music/track6.mp3'
                    ];
                    
                    const audio = document.getElementById('music-player');
                    
                    // Get saved state or initialize
                    let currentTrack;
                    let currentTime;
                    let isPlaying = false;
                    
                    // Try to get data from localStorage
                    try {
                        const savedTrack = localStorage.getItem('currentMusicTrack');
                        const savedTime = localStorage.getItem('currentMusicTime');
                        const savedPlaying = localStorage.getItem('isMusicPlaying');
                        
                        if (savedTrack !== null) {
                            currentTrack = parseInt(savedTrack);
                        } else {
                            currentTrack = Math.floor(Math.random() * tracks.length);
                        }
                        
                        if (savedTime !== null) {
                            currentTime = parseFloat(savedTime);
                        } else {
                            currentTime = 0;
                        }
                        
                        isPlaying = savedPlaying === 'true';
                    } catch (e) {
                        console.log("Error retrieving music state:", e);
                        currentTrack = Math.floor(Math.random() * tracks.length);
                        currentTime = 0;
                    }
                    
                    // Set initial track and time
                    audio.src = tracks[currentTrack];
                    audio.currentTime = currentTime;
                    
                    // Save state every second
                    setInterval(function() {
                        localStorage.setItem('currentMusicTrack', currentTrack);
                        localStorage.setItem('currentMusicTime', audio.currentTime);
                        localStorage.setItem('isMusicPlaying', !audio.paused);
                    }, 1000);
                    
                    // Skip to next track when current one ends
                    audio.addEventListener('ended', function() {
                        currentTrack = (currentTrack + 1) % tracks.length;
                        audio.src = tracks[currentTrack];
                        audio.play()
                            .catch(e => console.log("Error playing next track:", e));
                    });
                    
                    // Function to skip to next track (called from parent window)
                    window.skipTrack = function() {
                        currentTrack = (currentTrack + 1) % tracks.length;
                        audio.src = tracks[currentTrack];
                        localStorage.setItem('currentMusicTrack', currentTrack);
                        localStorage.setItem('currentMusicTime', 0);
                        audio.play()
                            .catch(e => console.log("Error playing next track:", e));
                    };
                    
                    // Function to start/resume playback
                    window.startMusic = function() {
                        if (audio.paused) {
                            audio.play()
                                .catch(e => console.log("Error starting music:", e));
                        }
                    };
                    
                    // If it was playing before, resume
                    if (isPlaying) {
                        audio.play()
                            .catch(e => {
                                console.log("Auto-play prevented. Will play after user interaction");
                            });
                    }
                </script>
            </body>
            </html>
        `;
        
        // Set the iframe content
        musicIframe.srcdoc = musicHTML;
        document.body.appendChild(musicIframe);
        
        // Create skip button
        const skipButton = document.createElement('div');
        skipButton.innerHTML = '<i class="fas fa-forward"></i>';
        skipButton.style.position = 'fixed';
        skipButton.style.bottom = '20px';
        skipButton.style.right = '20px';
        skipButton.style.backgroundColor = '#ff6b00';
        skipButton.style.color = 'white';
        skipButton.style.width = '40px';
        skipButton.style.height = '40px';
        skipButton.style.borderRadius = '50%';
        skipButton.style.display = 'flex';
        skipButton.style.alignItems = 'center';
        skipButton.style.justifyContent = 'center';
        skipButton.style.cursor = 'pointer';
        skipButton.style.zIndex = '1000';
        skipButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
        document.body.appendChild(skipButton);
        
        // Add click event to skip button
        skipButton.addEventListener('click', function() {
            if (musicIframe.contentWindow) {
                musicIframe.contentWindow.skipTrack();
            }
        });
    } else {
        // If iframe already exists, we need to create just the skip button
        // without recreating the iframe (which would reset the music)
        let skipButton = document.getElementById('music-skip-button');
        
        if (!skipButton) {
            skipButton = document.createElement('div');
            skipButton.id = 'music-skip-button';
            skipButton.innerHTML = '<i class="fas fa-forward"></i>';
            skipButton.style.position = 'fixed';
            skipButton.style.bottom = '20px';
            skipButton.style.right = '20px';
            skipButton.style.backgroundColor = '#ff6b00';
            skipButton.style.color = 'white';
            skipButton.style.width = '40px';
            skipButton.style.height = '40px';
            skipButton.style.borderRadius = '50%';
            skipButton.style.display = 'flex';
            skipButton.style.alignItems = 'center';
            skipButton.style.justifyContent = 'center';
            skipButton.style.cursor = 'pointer';
            skipButton.style.zIndex = '1000';
            skipButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
            document.body.appendChild(skipButton);
            
            // Add click event to skip button
            skipButton.addEventListener('click', function() {
                // Get iframe by name (more reliable across page navigations)
                const frame = window.frames['musicFrame'];
                if (frame) {
                    frame.skipTrack();
                }
            });
        }
    }
    
    // Function to start music on user interaction
    function startMusicOnInteraction() {
        // Try to get iframe by both ID and name
        const iframe = document.getElementById('music-iframe');
        const frame = window.frames['musicFrame'];
        
        if (iframe && iframe.contentWindow && iframe.contentWindow.startMusic) {
            iframe.contentWindow.startMusic();
        } else if (frame && frame.startMusic) {
            frame.startMusic();
        }
        
        // Remove event listeners
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
    }
    
    // Add event listeners for user interaction
    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);
});