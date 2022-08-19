package tender.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;
import tender.domain.Prvorangirani;
import tender.domain.Prvorangirani_;
import tender.repository.PrvorangiraniRepository;
import tender.service.criteria.PrvorangiraniCriteria;

@Service
@Transactional(readOnly = true)
public class PrvorangiraniQueryService extends QueryService<Prvorangirani> {

    private final Logger log = LoggerFactory.getLogger(PrvorangiraniQueryService.class);

    private final PrvorangiraniRepository prvorangiraniRepository;

    public PrvorangiraniQueryService(PrvorangiraniRepository prvorangiraniRepository) {
        this.prvorangiraniRepository = prvorangiraniRepository;
    }

    /**
     * Return a {@link List} of {@link Prvorangirani} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Prvorangirani> findByCriteria(PrvorangiraniCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Prvorangirani> specification = createSpecification(criteria);
        return prvorangiraniRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Prvorangirani} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Prvorangirani> findByCriteria(PrvorangiraniCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Prvorangirani> specification = createSpecification(criteria);
        return prvorangiraniRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(PrvorangiraniCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Prvorangirani> specification = createSpecification(criteria);
        return prvorangiraniRepository.count(specification);
    }

    /**
     * Function to convert {@link PrvorangiraniCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Prvorangirani> createSpecification(PrvorangiraniCriteria criteria) {
        Specification<Prvorangirani> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Prvorangirani_.id));
            }
            if (criteria.getSifraPostupka() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSifraPostupka(), Prvorangirani_.sifraPostupka));
            }
            if (criteria.getSifraPonude() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getSifraPonude(), Prvorangirani_.sifraPonude));
            }
            if (criteria.getBrojPartije() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getBrojPartije(), Prvorangirani_.brojPartije));
            }
            if (criteria.getAtc() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAtc(), Prvorangirani_.atc));
            }
            if (criteria.getZasticeniNaziv() != null) {
                specification = specification.and(buildStringSpecification(criteria.getZasticeniNaziv(), Prvorangirani_.zasticeniNaziv));
            }

            if (criteria.getTrazenaKolicina() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getTrazenaKolicina(), Prvorangirani_.trazenaKolicina));
            }
            if (criteria.getProcijenjenaVrijednost() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getProcijenjenaVrijednost(), Prvorangirani_.procijenjenaVrijednost));
            }
            if (criteria.getPonudjenaVrijednost() != null) {
                specification =
                    specification.and(buildRangeSpecification(criteria.getPonudjenaVrijednost(), Prvorangirani_.ponudjenaVrijednost));
            }
            if (criteria.getRokIsporuke() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getRokIsporuke(), Prvorangirani_.rokIsporuke));
            }
            if (criteria.getsifraPonudjaca() != null) {
                specification = specification.and(buildStringSpecification(criteria.getsifraPonudjaca(), Prvorangirani_.sifraPonudjaca));
            }
            if (criteria.getNazivProizvodjaca() != null) {
                specification =
                    specification.and(buildStringSpecification(criteria.getNazivProizvodjaca(), Prvorangirani_.nazivProizvodjaca));
            }
        }
        return specification;
    }
}
