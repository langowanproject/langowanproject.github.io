
    async function fetchData() {
        try {
            const response = await fetch("dark/data-input/data.txt");
            const text = await response.text();
            return parseDataFile(text);
        } catch (error) {
            console.error("Gagal memuat data:", error);
            return null;
        }
    }

    function parseDataFile(data) {
        const lines = data.split('\n');
        const result = {};

        for (const line of lines) {
            if (!line.trim() || line.startsWith("==========")) continue;

            if (line.includes(':')) {
                const [key, value] = line.split(':').map(part => part.trim());
                result[key] = value;
            }
        }
        return result;
    }

    function parseDate(dateString) {
        const months = {
            "Januari": 0, "Februari": 1, "Maret": 2, "April": 3, "Mei": 4, "Juni": 5,
            "Juli": 6, "Agustus": 7, "September": 8, "Oktober": 9, "November": 10, "Desember": 11
        };
        const parts = dateString.split(" ");
        return {
            date: parseInt(parts[1], 10),
            month: months[parts[2]] + 1, // Ditambah 1 karena bulan dalam simplyCountdown dimulai dari 1
            year: parseInt(parts[3], 10)
        };
    }

    function parseTime(timeString) {
        const parts = timeString.match(/(\d+).(\d+)/);
        return {
            hours: parts ? parseInt(parts[1], 10) : 0,
            minutes: parts ? parseInt(parts[2], 10) : 0
        };
    }

    async function initializeCountdown() {
        const data = await fetchData();
        if (!data) return;

        const pemberkatanDate = parseDate(data["tanggal-pemberkatan"]);
        const pemberkatanTime = parseTime(data["waktu-pemberkatan"]);

        simplyCountdown('.simply-countdown', { 
            year: pemberkatanDate.year, 
            month: pemberkatanDate.month, 
            day: pemberkatanDate.date, 
            hours: pemberkatanTime.hours, 
            minutes: pemberkatanTime.minutes, 
            words: { 
                days: { singular: 'hari', plural: 'hari' },
                hours: { singular: 'jam', plural: 'jam' },
                minutes: { singular: 'menit', plural: 'menit' },
                seconds: { singular: 'detik', plural: 'detik' }
            }
        });
    }

    initializeCountdown();
