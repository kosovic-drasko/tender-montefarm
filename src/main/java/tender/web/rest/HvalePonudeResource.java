package tender.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import tender.domain.HvalePonude;
import tender.repository.HvalePonudeRepository;
import tender.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link HvalePonude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HvalePonudeResource {

    private final Logger log = LoggerFactory.getLogger(HvalePonudeResource.class);

    private static final String ENTITY_NAME = "hvalePonude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HvalePonudeRepository hvalePonudeRepository;

    public HvalePonudeResource(HvalePonudeRepository hvalePonudeRepository) {
        this.hvalePonudeRepository = hvalePonudeRepository;
    }

    /**
     * {@code POST  /hvale-ponudes} : Create a new hvalePonude.
     *
     * @param hvalePonude the hvalePonude to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hvalePonude, or with status {@code 400 (Bad Request)} if the hvalePonude has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/hvale-ponudes")
    public ResponseEntity<HvalePonude> createHvalePonude(@RequestBody HvalePonude hvalePonude) throws URISyntaxException {
        log.debug("REST request to save HvalePonude : {}", hvalePonude);
        if (hvalePonude.getId() != null) {
            throw new BadRequestAlertException("A new hvalePonude cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HvalePonude result = hvalePonudeRepository.save(hvalePonude);
        return ResponseEntity
            .created(new URI("/api/hvale-ponudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /hvale-ponudes/:id} : Updates an existing hvalePonude.
     *
     * @param id the id of the hvalePonude to save.
     * @param hvalePonude the hvalePonude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hvalePonude,
     * or with status {@code 400 (Bad Request)} if the hvalePonude is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hvalePonude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/hvale-ponudes/{id}")
    public ResponseEntity<HvalePonude> updateHvalePonude(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HvalePonude hvalePonude
    ) throws URISyntaxException {
        log.debug("REST request to update HvalePonude : {}, {}", id, hvalePonude);
        if (hvalePonude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hvalePonude.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hvalePonudeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HvalePonude result = hvalePonudeRepository.save(hvalePonude);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hvalePonude.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /hvale-ponudes/:id} : Partial updates given fields of an existing hvalePonude, field will ignore if it is null
     *
     * @param id the id of the hvalePonude to save.
     * @param hvalePonude the hvalePonude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hvalePonude,
     * or with status {@code 400 (Bad Request)} if the hvalePonude is not valid,
     * or with status {@code 404 (Not Found)} if the hvalePonude is not found,
     * or with status {@code 500 (Internal Server Error)} if the hvalePonude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/hvale-ponudes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HvalePonude> partialUpdateHvalePonude(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HvalePonude hvalePonude
    ) throws URISyntaxException {
        log.debug("REST request to partial update HvalePonude partially : {}, {}", id, hvalePonude);
        if (hvalePonude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hvalePonude.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hvalePonudeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HvalePonude> result = hvalePonudeRepository
            .findById(hvalePonude.getId())
            .map(existingHvalePonude -> {
                if (hvalePonude.getSifraPostupka() != null) {
                    existingHvalePonude.setSifraPostupka(hvalePonude.getSifraPostupka());
                }
                if (hvalePonude.getBrojPartije() != null) {
                    existingHvalePonude.setBrojPartije(hvalePonude.getBrojPartije());
                }
                if (hvalePonude.getInn() != null) {
                    existingHvalePonude.setInn(hvalePonude.getInn());
                }
                if (hvalePonude.getFarmaceutskiOblikLijeka() != null) {
                    existingHvalePonude.setFarmaceutskiOblikLijeka(hvalePonude.getFarmaceutskiOblikLijeka());
                }
                if (hvalePonude.getPakovanje() != null) {
                    existingHvalePonude.setPakovanje(hvalePonude.getPakovanje());
                }
                if (hvalePonude.getTrazenaKolicina() != null) {
                    existingHvalePonude.setTrazenaKolicina(hvalePonude.getTrazenaKolicina());
                }
                if (hvalePonude.getProcijenjenaVrijednost() != null) {
                    existingHvalePonude.setProcijenjenaVrijednost(hvalePonude.getProcijenjenaVrijednost());
                }

                return existingHvalePonude;
            })
            .map(hvalePonudeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hvalePonude.getId().toString())
        );
    }

    /**
     * {@code GET  /hvale-ponudes} : get all the hvalePonudes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hvalePonudes in body.
     */
    @GetMapping("/hvale-ponudes")
    public ResponseEntity<List<HvalePonude>> getAllHvalePonudes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of HvalePonudes");
        Page<HvalePonude> page = hvalePonudeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /hvale-ponudes/:id} : get the "id" hvalePonude.
     *
     * @param id the id of the hvalePonude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hvalePonude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/hvale-ponudes/{id}")
    public ResponseEntity<HvalePonude> getHvalePonude(@PathVariable Long id) {
        log.debug("REST request to get HvalePonude : {}", id);
        Optional<HvalePonude> hvalePonude = hvalePonudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(hvalePonude);
    }

    /**
     * {@code DELETE  /hvale-ponudes/:id} : delete the "id" hvalePonude.
     *
     * @param id the id of the hvalePonude to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/hvale-ponudes/{id}")
    public ResponseEntity<Void> deleteHvalePonude(@PathVariable Long id) {
        log.debug("REST request to delete HvalePonude : {}", id);
        hvalePonudeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/hvale/{sifra}")
    public List<HvalePonude> getHvalePonude(@PathVariable Integer sifra) {
        return hvalePonudeRepository.HvalePonude(sifra);
    }
}
