package tender.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import tender.domain.Specifikacije;

public class ExcelUtilsSpecifikacije {

    public static String EXCELTYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public static ByteArrayInputStream customersToExcel(List<Specifikacije> specifikacije) throws IOException {
        String[] COLUMNs = {
            "Id",
            "Sifra Postupka",
            "Broj Partije",
            "Kolicina",
            "Procijenjena",
            "atc",
            "inn",
            "Farmaceutski Oblik",
            "Jacina Lijeka",
            "Pakovanje",
            "Jedinica Mjere",
        };
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            CreationHelper createHelper = workbook.getCreationHelper();

            Sheet sheet = workbook.createSheet("Specifikacije");

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.BLUE.getIndex());

            CellStyle headerCellStyle = workbook.createCellStyle();
            headerCellStyle.setFont(headerFont);

            // Row for Header
            Row headerRow = sheet.createRow(0);

            // Header
            for (int col = 0; col < COLUMNs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(COLUMNs[col]);
                cell.setCellStyle(headerCellStyle);
            }

            // CellStyle for Age
            CellStyle ageCellStyle = workbook.createCellStyle();
            ageCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("#"));

            int rowIdx = 1;
            for (Specifikacije specifikacijes : specifikacije) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(specifikacijes.getId());
                row.createCell(1).setCellValue(specifikacijes.getSifraPostupka());
                row.createCell(2).setCellValue(specifikacijes.getBrojPartije());
                row.createCell(3).setCellValue(specifikacijes.getTrazenaKolicina());
                row.createCell(4).setCellValue(specifikacijes.getProcijenjenaVrijednost());
                row.createCell(5).setCellValue(specifikacijes.getAtc());
                row.createCell(6).setCellValue(specifikacijes.getInn());
                row.createCell(7).setCellValue(specifikacijes.getFarmaceutskiOblikLijeka());
                row.createCell(8).setCellValue(specifikacijes.getJacinaLijeka());
                row.createCell(9).setCellValue(specifikacijes.getPakovanje());
                row.createCell(10).setCellValue(specifikacijes.getJedinicaMjere());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public static List<Specifikacije> parseExcelFile(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet("Specifikacije");
            Iterator<Row> rows = sheet.iterator();

            List<Specifikacije> lstSpecifikacije = new ArrayList<Specifikacije>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                Specifikacije specifikacije = new Specifikacije();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {
                        case 0:
                            specifikacije.setId((long) currentCell.getNumericCellValue());
                            break;
                        case 1:
                            specifikacije.setSifraPostupka((int) currentCell.getNumericCellValue());
                            break;
                        case 2:
                            specifikacije.setBrojPartije((int) currentCell.getNumericCellValue());
                            break;
                        case 3:
                            specifikacije.setTrazenaKolicina((int) currentCell.getNumericCellValue());
                            break;
                        case 4:
                            specifikacije.setProcijenjenaVrijednost((double) currentCell.getNumericCellValue());
                            break;
                        case 5:
                            specifikacije.setAtc(currentCell.getStringCellValue());
                            break;
                        case 6:
                            specifikacije.setInn(currentCell.getStringCellValue());
                            break;
                        case 7:
                            specifikacije.setFarmaceutskiOblikLijeka(currentCell.getStringCellValue());
                            break;
                        case 8:
                            specifikacije.setJacinaLijeka(currentCell.getStringCellValue());
                            break;
                        case 9:
                            specifikacije.setPakovanje(currentCell.getStringCellValue());
                            break;
                        case 10:
                            specifikacije.setJedinicaMjere(currentCell.getStringCellValue());
                            break;
                        default:
                            break;
                    }

                    cellIdx++;
                }

                lstSpecifikacije.add(specifikacije);
            }

            // Close WorkBook
            workbook.close();

            return lstSpecifikacije;
        } catch (IOException e) {
            throw new RuntimeException("FAIL! -> message = " + e.getMessage());
        }
    }

    public static boolean isExcelFile(MultipartFile file) {
        if (!EXCELTYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }
}
