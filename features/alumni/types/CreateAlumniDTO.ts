export type CreateAlumniDTO = {
	nama: string | undefined;
	tgl_lahir: string | undefined;
	tahun_mulai: string | undefined;
	tahun_lulus: string | undefined;
	no_tlp: string | undefined;
	email: string | undefined;
	alamat: string | undefined;
	tempat_kerja?: string | undefined;
	jabatan_kerja?: string | undefined;
	tempat_kuliah?: string | undefined;
	prodi_kuliah?: string | undefined;
	kesesuaian_kerja?: string | undefined;
	kesesuaian_kuliah?: string | undefined;
	photo?: string | undefined;
	jurusan_id: number;
};
