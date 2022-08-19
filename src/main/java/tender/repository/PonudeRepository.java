package tender.repository;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tender.domain.Ponude;

/**
 * Spring Data SQL repository for the Ponude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PonudeRepository extends JpaRepository<Ponude, Long>, JpaSpecificationExecutor<Ponude> {
    @Modifying
    @Transactional
    @Query("delete from Ponude p where p.sifraPonude=:sifraPonude")
    void deletePonudeSifraPonude(@Param("sifraPonude") Integer sifraPonude);

    @Query("select p from Ponude p where p.sifraPostupka=:sifraPostupka")
    List<Ponude> findBySifraPostupkaList(@Param("sifraPostupka") Integer sifraPostupka);

    @Modifying
    @Transactional
    @Query("DELETE from Ponude p WHERE p.selected = true")
    void deleteBySelected();

    @Modifying
    @Transactional
    @Query("UPDATE Ponude p SET p.selected=true WHERE p.id = :Id")
    void updateSlected(@Param("Id") Long Id);
}
