export type Alumni = {
	id: number;
	nama: string;
	tgl_lahir: string;
	tahun_mulai: string;
	tahun_lulus: string;
	no_tlp: string;
	email: string;
	alamat: string;
	jurusan: {
		id: number;
		nama: string;
		tgl_berdiri: string;
	};
	tempat_kerja: string | null;
	jabatan_kerja: string | null;
	tempat_kuliah: string | null;
	prodi_kuliah: string | null;
	kesesuaian_kerja: boolean | null;
	kesesuaian_kuliah: boolean | null;
	photo: string | null;
	created_at?: Date;
	updated_at?: Date;
};

export type AlumniChart = {
	bar_data: {
		total_pengangguran: number;
		total_kuliah: number;
		total_kerja: number;
		total_kuliah_dan_kerja: number;
	};
	pie_data: {
		pct_tidak_sesuai: number;
		pct_kuliah_sesuai: number;
		pct_kerja_sesuai: number;
	};
};
