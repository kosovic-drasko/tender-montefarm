package tender.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import tender.domain.Vrednovanje;

/**
 * Spring Data SQL repository for the Vrednovanje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VrednovanjeRepository extends JpaRepository<Vrednovanje, Long>, JpaSpecificationExecutor<Vrednovanje> {}
