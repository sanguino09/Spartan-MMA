#include <stdio.h>
#include <stdlib.h>
#include <jpeglib.h>

int main(int argc, char **argv) {
    if (argc < 4) {
        fprintf(stderr, "Usage: %s <input> <output> <quality>\n", argv[0]);
        return 1;
    }

    const char *input_path = argv[1];
    const char *output_path = argv[2];
    int quality = atoi(argv[3]);
    if (quality < 1 || quality > 100) {
        fprintf(stderr, "Quality must be between 1 and 100.\n");
        return 1;
    }

    FILE *infile = fopen(input_path, "rb");
    if (!infile) {
        perror("Failed to open input file");
        return 1;
    }

    struct jpeg_decompress_struct cinfo_in;
    struct jpeg_error_mgr jerr_in;

    cinfo_in.err = jpeg_std_error(&jerr_in);
    jpeg_create_decompress(&cinfo_in);
    jpeg_stdio_src(&cinfo_in, infile);

    if (jpeg_read_header(&cinfo_in, TRUE) != JPEG_HEADER_OK) {
        fprintf(stderr, "Failed to read JPEG header from %s\n", input_path);
        jpeg_destroy_decompress(&cinfo_in);
        fclose(infile);
        return 1;
    }

    jpeg_start_decompress(&cinfo_in);

    JDIMENSION width = cinfo_in.output_width;
    JDIMENSION height = cinfo_in.output_height;
    int channels = cinfo_in.output_components;

    JSAMPARRAY buffer = (*cinfo_in.mem->alloc_sarray)((j_common_ptr) &cinfo_in, JPOOL_IMAGE, width * channels, 1);

    FILE *outfile = fopen(output_path, "wb");
    if (!outfile) {
        perror("Failed to open output file");
        jpeg_finish_decompress(&cinfo_in);
        jpeg_destroy_decompress(&cinfo_in);
        fclose(infile);
        return 1;
    }

    struct jpeg_compress_struct cinfo_out;
    struct jpeg_error_mgr jerr_out;

    cinfo_out.err = jpeg_std_error(&jerr_out);
    jpeg_create_compress(&cinfo_out);
    jpeg_stdio_dest(&cinfo_out, outfile);

    cinfo_out.image_width = width;
    cinfo_out.image_height = height;
    cinfo_out.input_components = channels;
    cinfo_out.in_color_space = cinfo_in.out_color_space;

    jpeg_set_defaults(&cinfo_out);
    jpeg_set_quality(&cinfo_out, quality, TRUE);

    jpeg_start_compress(&cinfo_out, TRUE);

    while (cinfo_in.output_scanline < height) {
        JDIMENSION read_lines = jpeg_read_scanlines(&cinfo_in, buffer, 1);
        jpeg_write_scanlines(&cinfo_out, buffer, read_lines);
    }

    jpeg_finish_compress(&cinfo_out);
    jpeg_destroy_compress(&cinfo_out);

    jpeg_finish_decompress(&cinfo_in);
    jpeg_destroy_decompress(&cinfo_in);

    fclose(infile);
    fclose(outfile);

    return 0;
}
